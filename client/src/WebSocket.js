import React, { useEffect, useRef, useState } from 'react';
import axios from "axios";


const WebSock = () => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState('');
  const socket = useRef();
  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState('');




function connect() {
    socket.current = new WebSocket('ws://localhost:5002')

    socket.current.onopen = () => {
      setConnected(true);
      console.log('Connected');
      const message = {
        event: 'connection',
        id: Date.now(),
        username,
      }
      socket.current.send(JSON.stringify(message));
    }

    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages(prev => [message, ...prev])
    }

    socket.current.onclose = () => {
      console.log('Socket Close')
    }

    socket.current.onerror = () => {
      console.log(`Socket Error`)
    }

  }


  const sendMessage = async () => {
    const message = {
      username,
      message: value,
      id: Date.now(),
      event: 'message',
    }
    socket.current.send(JSON.stringify(message));
    setValue('')
  }
  // console.log(messages.length)

  if (!connected) {
    return (
      <div className="center">
        <div className="form">
          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
            type="text"
            placeholder="Enter your name"
          />
          <button onClick={connect}>Enter</button>
        </div>

      </div>
    )
  }

  return (
    <div className="center">
      <div>
        <div className="form">
          <input type="text" value={value} onChange={e => setValue(e.target.value)}/>
          <button onClick={sendMessage}>Send</button>
        </div>
        <div className="messages">
          {messages.map(mess=>
            <div key={mess.id}>
              {mess.event === 'connection'
                ? <div className="connection_message"> User {mess.username} connected </div>
                : <div className="message"> {mess.username}. {mess.message} </div>
              }
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default WebSock;
