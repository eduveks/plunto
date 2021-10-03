
_out.json(
    _db.query(
        `SELECT content FROM message WHERE room_id = ?`,
        _db.get('room', _req.getValues('room', _val.map()).getString('uid'))
    )
)
