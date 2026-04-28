import json
import os
import psycopg2


def handler(event: dict, context) -> dict:
    '''
    Личный кабинет участника: баланс КМ, уровень, прогресс, история начислений.
    GET ?email=... возвращает данные кабинета.
    '''
    method = event.get('httpMethod', 'GET')

    cors = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
    }

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors, 'body': ''}

    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {**cors, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Method not allowed'}),
        }

    qs = event.get('queryStringParameters') or {}
    email = (qs.get('email') or '').strip().lower()

    if not email or '@' not in email:
        return {
            'statusCode': 400,
            'headers': {**cors, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Нужен email'}),
        }

    def esc(v: str) -> str:
        return (v or '').replace("'", "''")

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    conn.autocommit = True
    cur = conn.cursor()

    try:
        cur.execute(
            f"""SELECT id, email, name, phone, km_balance, level, created_at
                FROM t_p82937916_crypto_metry_system.participants
                WHERE email = '{esc(email)}' LIMIT 1"""
        )
        row = cur.fetchone()

        if not row:
            return {
                'statusCode': 404,
                'headers': {**cors, 'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'Участник не найден. Заполни анкету квартиры, чтобы начать майнить.'}, ensure_ascii=False),
            }

        pid, email_v, name, phone, balance, level, created_at = row
        balance = float(balance)

        cur.execute(
            f"""SELECT amount, reason, description, created_at
                FROM t_p82937916_crypto_metry_system.km_transactions
                WHERE participant_id = {pid}
                ORDER BY created_at DESC LIMIT 50"""
        )
        txs = []
        for a, r, d, c in cur.fetchall():
            txs.append({
                'amount': float(a),
                'reason': r,
                'description': d or '',
                'created_at': c.isoformat() if c else None,
            })

        cur.execute(
            f"SELECT COUNT(*) FROM t_p82937916_crypto_metry_system.apartment_surveys WHERE participant_id = {pid}"
        )
        surveys_count = cur.fetchone()[0]

        cur.execute(
            f"SELECT 1 FROM t_p82937916_crypto_metry_system.admin_emails WHERE email = '{esc(email_v)}' LIMIT 1"
        )
        is_admin = cur.fetchone() is not None

        thresholds = [
            {'code': 'start',        'name': 'Старт',                    'max': 1},
            {'code': 'profile',      'name': 'Профиль спроса',           'max': 10},
            {'code': 'confirmed',    'name': 'Подтверждённый участник',  'max': 25},
            {'code': 'core',         'name': 'Ядро спроса',              'max': 100},
            {'code': 'next_contour', 'name': 'Следующий контур',         'max': None},
        ]

        if balance < 1:
            next_target = 1
            current_level = 'start'
        elif balance < 10:
            next_target = 10
            current_level = 'profile'
        elif balance < 25:
            next_target = 25
            current_level = 'confirmed'
        elif balance < 100:
            next_target = 100
            current_level = 'core'
        else:
            next_target = None
            current_level = 'next_contour'

        goal_km = 500
        goal_progress_pct = min(100.0, round(balance / goal_km * 100, 2))

        return {
            'statusCode': 200,
            'headers': {**cors, 'Content-Type': 'application/json'},
            'body': json.dumps({
                'ok': True,
                'participant': {
                    'id': pid,
                    'email': email_v,
                    'name': name or '',
                    'phone': phone or '',
                    'km_balance': round(balance, 2),
                    'level': current_level,
                    'created_at': created_at.isoformat() if created_at else None,
                },
                'next_target': next_target,
                'goal_km': goal_km,
                'goal_progress_pct': goal_progress_pct,
                'surveys_count': surveys_count,
                'is_admin': is_admin,
                'transactions': txs,
                'levels': thresholds,
            }, ensure_ascii=False),
        }
    finally:
        cur.close()
        conn.close()