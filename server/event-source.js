const express = require('express');
const cors = require('cors');
const events = require('events');
const { json } = require("express");
const ws = require('ws')
const PORT = 5002;

const emitter = new events.EventEmitter();
console.log(ws)
const app = express();

app.use(cors())
app.use(express.json())

app.get('/connect', (req, res) => {
  res.writeHead(200, {
    'Connection': 'keep-alive',
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cash',
  })

  emitter.on('newMessage', (message) => {
    res.write(`data: ${JSON.stringify(message)} \n\n`)
  })
})

app.post('/new-messages', (req, res) => {
  const message = req.body;
  emitter.emit('newMessage', message)
  res.status(200)
})

app.listen(PORT, ()=> console.log(`server started on PORT ${PORT}`))
