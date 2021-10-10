
/**
  *
  *  EN: This service executes when the WebSocket client connects.
  *
  *  PT: Este serviço é executado quando o cliente WebSocket conecta.
  *
  */

const dbParticipant = _db.get('participant', _ws.path().getString("participant-uid"))

if (dbParticipant == null) {
    _ws.close()
}
