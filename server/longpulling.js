const express = require('express');
const cors = require('cors');
const events = require('events');
const PORT = 5002;

const emitter = new events.EventEmitter();

const app = express();

app.use(cors())

app.get('get-messages', (req, res) => {
  emitter.once('newMessage', (message) => { // тут передаем сообщение из emitter.emit
    res.json(message)
  })
})

app.post('new-messages', (req, res) => {
  const message = req.body;
  emitter.emit('newMessage', message) // тут помещаем сообщение
  res.status(200)
})

app.listen(PORT, ()=> console.log(`server started on PORT ${PORT}`))
