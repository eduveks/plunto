
const dbRoom = _db.get('room', _dataItem.getRecord().getInt('room_id'))

_ws.broadcastAsService(
    'room',
    `${dbRoom.getString('uid')}`,
    _val.map()
        .set('method', 'DELETE')
        .set("service", "/message")
        .set(
            'content',
            _val.map()
                .set('uid', _dataItem.uid)
        )
)
