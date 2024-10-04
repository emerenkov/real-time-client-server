import React, { useEffect, useState } from 'react';
import axios from "axios";

const EventSourcing = () => {
  const [messages, setMessages] = useState([])
  const [value, setValue] = useState('')

  let eventSource;

  useEffect(()=> {
    subscribe();

    return () => {
      if(eventSource) {
        eventSource.close();
        console.log('event close')
      }
        }
  }, [])

  const subscribe = async () => {
    console.log('render')
    eventSource = new EventSource(`http://localhost:5002/connect`)
    eventSource.onmessage = function (event) {
      const message = JSON.parse(event.data);
      console.log(message)
      setMessages(prev => [...prev, message])
    }
  }

  const sendMessage = async () => {
    await axios.post('http://localhost:5002/new-messages', {
      message: value,
      id: Date.now()
    })
  }
  console.log(messages.length)

  return (
    <div className="center">
      <div>
        <div className="form">
          <input type="text" value={value} onChange={e => setValue(e.target.value)}/>
          <button onClick={sendMessage}>Send</button>
        </div>
        <div className="messages">
          {messages.map(mess=>
            <div className="message" key={mess.id}>
              {mess.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default EventSourcing;
