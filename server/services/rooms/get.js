const dbRooms = _db.query(`
    SELECT * FROM room WHERE active = true
`)

const list = _val.list()

for (const dbRoom of dbRooms) {
    list.add(
        _val.map()
            .set('uid', dbRoom.getString('uid'))
            .set('name', dbRoom.getString('name'))
    )
}

_out.json(
    list
)
