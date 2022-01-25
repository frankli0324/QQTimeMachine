from flask import Flask, request
from flask_cors import CORS
import sqlite3
import logging
import json

app = Flask(__name__)
CORS(app)

db = 'QQ.db'
logging.getLogger('flask_cors').level = logging.DEBUG

def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d


@app.route('/group/<int:gid>')
def group(gid):
    table = f'tb_TroopMsg_{gid}'
    page = request.args.get('page', 1, type=int)
    pagesize = 5000
    result = []
    with sqlite3.connect(db) as conn:
        conn.row_factory = dict_factory
        cur = conn.cursor()
        cur.execute(f'SELECT * FROM {table} LIMIT {pagesize} OFFSET {(page-1)*pagesize}')
        for item in cur.fetchall():
            item.pop('fontInfo')
            item.pop('exData')
            try:
                item['content'] = json.loads(item['content'])
            except:
                pass
            result.append(dict(item))
    return {'data': result}


app.run(debug=True, port=8081)
