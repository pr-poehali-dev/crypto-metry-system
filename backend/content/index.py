import json
import os
import base64
import uuid
import psycopg2
import boto3


SCHEMA = 't_p82937916_crypto_metry_system'
# v2 — публикуем функцию


def _cors():
    return {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-User-Email, X-Admin-Password',
        'Access-Control-Max-Age': '86400',
    }


def _esc(v: str) -> str:
    return (v or '').replace("'", "''")


def _check_password(headers: dict) -> bool:
    expected = (os.environ.get('ADMIN_PASSWORD') or '').strip()
    if not expected:
        return False
    given = (headers.get('X-Admin-Password') or headers.get('x-admin-password') or '').strip()
    return bool(given) and given == expected


def handler(event: dict, context) -> dict:
    '''
    Контент сайта: тексты и картинки секций.
    GET — публичный, отдаёт все поля контента.
    PUT — для админов, обновляет одно или несколько полей.
    POST /upload — для админов, загружает картинку в S3 и возвращает CDN URL.
    '''
    method = event.get('httpMethod', 'GET')
    cors = _cors()

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors, 'body': ''}

    headers = event.get('headers') or {}

    qs = event.get('queryStringParameters') or {}
    action = (qs.get('action') or '').strip().lower()

    if method == 'POST' and action == 'login':
        ok = _check_password(headers)
        return {
            'statusCode': 200 if ok else 401,
            'headers': {**cors, 'Content-Type': 'application/json'},
            'body': json.dumps({'ok': ok, 'error': None if ok else 'Неверный пароль'}, ensure_ascii=False),
        }

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    conn.autocommit = True
    cur = conn.cursor()

    try:
        if method == 'GET':
            cur.execute(
                f"""SELECT page, section, key, value, type, sort_order
                    FROM {SCHEMA}.site_content
                    ORDER BY page, sort_order, section, key"""
            )
            items = []
            for page, section, key, value, type_, sort_order in cur.fetchall():
                items.append({
                    'page': page,
                    'section': section,
                    'key': key,
                    'value': value,
                    'type': type_,
                    'sort_order': sort_order,
                })
            return {
                'statusCode': 200,
                'headers': {**cors, 'Content-Type': 'application/json'},
                'body': json.dumps({'ok': True, 'items': items}, ensure_ascii=False),
            }

        if method == 'PUT':
            if not _check_password(headers):
                return {
                    'statusCode': 401,
                    'headers': {**cors, 'Content-Type': 'application/json'},
                    'body': json.dumps({'error': 'Неверный пароль'}, ensure_ascii=False),
                }
            try:
                body = json.loads(event.get('body') or '{}')
            except Exception:
                return {
                    'statusCode': 400,
                    'headers': {**cors, 'Content-Type': 'application/json'},
                    'body': json.dumps({'error': 'Неверный JSON'}, ensure_ascii=False),
                }
            updates = body.get('updates') or []
            if not isinstance(updates, list) or not updates:
                return {
                    'statusCode': 400,
                    'headers': {**cors, 'Content-Type': 'application/json'},
                    'body': json.dumps({'error': 'Пустой список обновлений'}, ensure_ascii=False),
                }
            for u in updates:
                page = _esc(str(u.get('page') or ''))[:64]
                section = _esc(str(u.get('section') or ''))[:64]
                key = _esc(str(u.get('key') or ''))[:128]
                value = _esc(str(u.get('value') if u.get('value') is not None else ''))
                type_ = _esc(str(u.get('type') or 'text'))[:16]
                sort_order = int(u.get('sort_order') or 0)
                if not page or not section or not key:
                    continue
                cur.execute(
                    f"""INSERT INTO {SCHEMA}.site_content (page, section, key, value, type, sort_order, updated_at)
                        VALUES ('{page}', '{section}', '{key}', '{value}', '{type_}', {sort_order}, NOW())
                        ON CONFLICT (page, section, key) DO UPDATE SET
                          value = EXCLUDED.value,
                          type = EXCLUDED.type,
                          sort_order = EXCLUDED.sort_order,
                          updated_at = NOW()"""
                )
            return {
                'statusCode': 200,
                'headers': {**cors, 'Content-Type': 'application/json'},
                'body': json.dumps({'ok': True, 'updated': len(updates)}, ensure_ascii=False),
            }

        if method == 'POST':
            if not _check_password(headers):
                return {
                    'statusCode': 401,
                    'headers': {**cors, 'Content-Type': 'application/json'},
                    'body': json.dumps({'error': 'Неверный пароль'}, ensure_ascii=False),
                }
            try:
                body = json.loads(event.get('body') or '{}')
            except Exception:
                return {
                    'statusCode': 400,
                    'headers': {**cors, 'Content-Type': 'application/json'},
                    'body': json.dumps({'error': 'Неверный JSON'}, ensure_ascii=False),
                }
            file_b64 = body.get('file_base64') or ''
            filename = (body.get('filename') or 'image.png').lower()
            content_type = body.get('content_type') or 'image/png'
            if not file_b64:
                return {
                    'statusCode': 400,
                    'headers': {**cors, 'Content-Type': 'application/json'},
                    'body': json.dumps({'error': 'Нет файла'}, ensure_ascii=False),
                }
            ext = 'png'
            if '.' in filename:
                ext = filename.rsplit('.', 1)[-1][:5] or 'png'
            try:
                data = base64.b64decode(file_b64)
            except Exception:
                return {
                    'statusCode': 400,
                    'headers': {**cors, 'Content-Type': 'application/json'},
                    'body': json.dumps({'error': 'Файл не декодируется'}, ensure_ascii=False),
                }
            key_name = f'site/{uuid.uuid4().hex}.{ext}'
            s3 = boto3.client(
                's3',
                endpoint_url='https://bucket.poehali.dev',
                aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
                aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
            )
            s3.put_object(Bucket='files', Key=key_name, Body=data, ContentType=content_type)
            cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{key_name}"
            return {
                'statusCode': 200,
                'headers': {**cors, 'Content-Type': 'application/json'},
                'body': json.dumps({'ok': True, 'url': cdn_url}, ensure_ascii=False),
            }

        return {
            'statusCode': 405,
            'headers': {**cors, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Method not allowed'}),
        }
    finally:
        cur.close()
        conn.close()