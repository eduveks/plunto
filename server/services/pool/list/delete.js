
_db.delete('message', _req.getString('uid'))

_out.json(
    _val.map()
        .set('result', true)
)
