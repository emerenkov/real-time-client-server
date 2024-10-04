import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({
  port: 5002
// })
}, () => console.log('server is running'))

wss.on('connection', (ws) => {
  ws.on('message', async function (message) {
    message = JSON.parse(message)
    switch (message.event) {
      case 'message':
        broadcastMessage(message)
        break;
      case 'connection':
        broadcastMessage(message)  // Для примера таже ф-ция, а так тут может быть любая другая логика-функция...
        break;
    }
  })
})

function broadcastMessage(message) {
  wss.clients.forEach(client => {
    client.send(JSON.stringify(message))
  })
}
