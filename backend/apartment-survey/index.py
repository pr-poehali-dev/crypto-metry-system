import json
import os
import psycopg2


def handler(event: dict, context) -> dict:
    '''
    Приём анкеты квартиры и стартовое начисление КМ.
    Создаёт участника, сохраняет анкету, начисляет стартовые КМ, возвращает баланс.
    '''
    method = event.get('httpMethod', 'POST')

    cors = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
    }

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors, 'body': ''}

    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {**cors, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Method not allowed'}),
        }

    try:
        body = json.loads(event.get('body') or '{}')
    except Exception:
        return {
            'statusCode': 400,
            'headers': {**cors, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Invalid JSON'}),
        }

    email = (body.get('email') or '').strip().lower()
    name = (body.get('name') or '').strip()
    phone = (body.get('phone') or '').strip()

    if not email or '@' not in email:
        return {
            'statusCode': 400,
            'headers': {**cors, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Email обязателен'}),
        }

    city = (body.get('city') or '').strip()
    district = (body.get('district') or '').strip()
    housing_format = (body.get('housing_format') or '').strip()
    budget = (body.get('budget') or '').strip()
    timeline = (body.get('timeline') or '').strip()
    life_scenario = (body.get('life_scenario') or '').strip()
    priorities = (body.get('priorities') or '').strip()
    notes = (body.get('notes') or '').strip()

    def esc(v: str) -> str:
        return (v or '').replace("'", "''")

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    conn.autocommit = True
    cur = conn.cursor()

    try:
        cur.execute(
            f"SELECT id, km_balance FROM t_p82937916_crypto_metry_system.participants WHERE email = '{esc(email)}' LIMIT 1"
        )
        row = cur.fetchone()

        if row:
            participant_id = row[0]
            cur.execute(
                f"""UPDATE t_p82937916_crypto_metry_system.participants
                    SET name = COALESCE(NULLIF('{esc(name)}', ''), name),
                        phone = COALESCE(NULLIF('{esc(phone)}', ''), phone),
                        updated_at = NOW()
                    WHERE id = {participant_id}"""
            )
            is_new = False
        else:
            cur.execute(
                f"""INSERT INTO t_p82937916_crypto_metry_system.participants (email, name, phone)
                    VALUES ('{esc(email)}', NULLIF('{esc(name)}', ''), NULLIF('{esc(phone)}', ''))
                    RETURNING id"""
            )
            participant_id = cur.fetchone()[0]
            is_new = True

        has_details = any([city, district, housing_format, budget, timeline, life_scenario, priorities])

        cur.execute(
            f"""INSERT INTO t_p82937916_crypto_metry_system.apartment_surveys
                (participant_id, email, name, phone, city, district, housing_format, budget, timeline, life_scenario, priorities, notes, source)
                VALUES ({participant_id},
                        '{esc(email)}',
                        NULLIF('{esc(name)}', ''),
                        NULLIF('{esc(phone)}', ''),
                        NULLIF('{esc(city)}', ''),
                        NULLIF('{esc(district)}', ''),
                        NULLIF('{esc(housing_format)}', ''),
                        NULLIF('{esc(budget)}', ''),
                        NULLIF('{esc(timeline)}', ''),
                        NULLIF('{esc(life_scenario)}', ''),
                        NULLIF('{esc(priorities)}', ''),
                        NULLIF('{esc(notes)}', ''),
                        'mining-kvartiry')
                RETURNING id"""
        )
        survey_id = cur.fetchone()[0]

        awarded = 0.0
        breakdown = []

        if is_new:
            cur.execute(
                f"SELECT COUNT(*) FROM t_p82937916_crypto_metry_system.km_transactions WHERE participant_id = {participant_id} AND reason = 'registration'"
            )
            if cur.fetchone()[0] == 0:
                cur.execute(
                    f"INSERT INTO t_p82937916_crypto_metry_system.km_transactions (participant_id, amount, reason, description) VALUES ({participant_id}, 0.10, 'registration', 'Регистрация в системе')"
                )
                awarded += 0.10
                breakdown.append({'reason': 'registration', 'amount': 0.10, 'label': 'Регистрация'})

        if has_details:
            cur.execute(
                f"SELECT COUNT(*) FROM t_p82937916_crypto_metry_system.km_transactions WHERE participant_id = {participant_id} AND reason = 'survey'"
            )
            if cur.fetchone()[0] == 0:
                cur.execute(
                    f"INSERT INTO t_p82937916_crypto_metry_system.km_transactions (participant_id, amount, reason, description) VALUES ({participant_id}, 0.25, 'survey', 'Подробная анкета квартиры')"
                )
                awarded += 0.25
                breakdown.append({'reason': 'survey', 'amount': 0.25, 'label': 'Подробная анкета'})

        if awarded > 0:
            cur.execute(
                f"UPDATE t_p82937916_crypto_metry_system.participants SET km_balance = km_balance + {awarded}, updated_at = NOW() WHERE id = {participant_id}"
            )

        cur.execute(
            f"SELECT km_balance FROM t_p82937916_crypto_metry_system.participants WHERE id = {participant_id}"
        )
        balance = float(cur.fetchone()[0])

        if balance >= 100:
            level = 'next_contour'
        elif balance >= 25:
            level = 'core'
        elif balance >= 10:
            level = 'confirmed'
        elif balance >= 1:
            level = 'profile'
        else:
            level = 'start'

        cur.execute(
            f"UPDATE t_p82937916_crypto_metry_system.participants SET level = '{level}' WHERE id = {participant_id}"
        )

        return {
            'statusCode': 200,
            'headers': {**cors, 'Content-Type': 'application/json'},
            'body': json.dumps({
                'ok': True,
                'participant_id': participant_id,
                'survey_id': survey_id,
                'is_new': is_new,
                'km_awarded': round(awarded, 2),
                'km_balance': round(balance, 2),
                'level': level,
                'breakdown': breakdown,
            }, ensure_ascii=False),
        }
    finally:
        cur.close()
        conn.close()
