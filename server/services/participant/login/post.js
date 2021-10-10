
const name = _req.getString('name')

const dbParticipantId = _db.insert(
    'participant',
    _val.map()
        .set('name', name)
)

const dbParticipant = _db.get('participant', dbParticipantId)

_out.json(
    _val.map()
        .set('uid', dbParticipant.getString('uid'))
)
