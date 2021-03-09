import { createServer } from 'http'
import { Server } from 'socket.io'
import * as dotenvFlow from 'dotenv-flow'

dotenvFlow.config()
const PORT = process.env.PORT
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN

const httpServer = createServer((req, res) => {
  res.writeHead(200)
  res.end()
})

const io = new Server(httpServer, {
  cors: {
    origin: ALLOWED_ORIGIN,
  },
})
// @TODO: shared type-def of e
const broadcastDraw = (e: any) => io.sockets.emit('draws', e)
io.on('connection', (s) => {
  console.log(`${s.id} has connected`)
  s.on('draws', broadcastDraw)
})

httpServer.listen(PORT, () => {
  console.log(`Socket.io is up and running on port ${PORT}`)
})
