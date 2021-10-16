
const dbRoom = _db.get('room', _ws.path().getString('room-uid'))

const dbParticipant = _db.get('participant', _ws.path().getString('participant-uid'))

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
                .set('name', dbParticipant.getString('name'))
                .set('content', dbMessage.getString('content'))
        )
)

_ws.broadcastAsService(
    'pool',
    '/',
    _val.map()
        .set("service", "/pool/list")
        .set(
            'content',
            _val.map()
                .set(
                    'room', 
                    _val.map()
                        .set('uid', dbRoom.getString('uid'))
                        .set('name', dbRoom.getString('name'))
                )
                .set(
                    'participant', 
                    _val.map()
                        .set('uid', dbParticipant.getString('uid'))
                        .set('name', dbParticipant.getString('name'))
                )
                .set(
                    'message', 
                    _val.map()
                        .set('uid', dbMessage.getString('uid'))
                        .set('content', dbMessage.getString('content'))
                )
        )
)

