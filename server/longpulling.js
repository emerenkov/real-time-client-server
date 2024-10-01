const express = require('express');
const cors = require('cors');
const events = require('events');
const { json } = require("express");
const PORT = 5002;

const emitter = new events.EventEmitter();

const app = express();

app.use(cors())
app.use(express.json())

app.get('/get-messages', (req, res) => {

  // Пользователь отправляет ГЕТ запрос, но сервер не отправляет ответ, а подлисывается на событие и ждет пока другой
  // участник чата напишет сообщение (пошлет ПОСТ запрос) сервер это событие вызывает (emitter.emit), после чего всем
  // участникам чата возвращается ответ
  emitter.once('newMessage', (message) => { // тут передаем сообщение из emitter.emit
    res.json(message)
  })
})

app.post('/new-messages', (req, res) => {
  const message = req.body;
  emitter.emit('newMessage', message) // тут помещаем сообщение, которое отправляется в ГЕТ запросе
  res.status(200)
})

app.listen(PORT, ()=> console.log(`server started on PORT ${PORT}`))
