
const dbRoom = _db.get('room', _req.getValues('room', _val.map()).getString('uid'))

const content = _req.getValues('message', _val.map()).getString('content')

const messageId = _db.insert(
    'message',
    _val.map()
        .set('room_id', dbRoom.getInt('id'))
        .set('content', content)
)

const dbMessage = _db.get('message', messageId)

_ws.broadcastAsService(
    'room',
    `${dbRoom.getString('uid')}`,
    _val.map()
        .set("service", "/message")
        .set(
            'content',
            _val.map()
                .set('uid', dbMessage.getString('uid'))
                .set('content', dbMessage.getString('content'))
        )
)
