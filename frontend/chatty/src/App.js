import './App.css';

import { useState, useEffect } from 'react'

import io from 'socket.io-client'
import { nanoid } from 'nanoid'


const socket = io.connect('http://localhost:4000')

const username = nanoid(4)


function App() {


  const [message, setMessage] = useState('')
  const [chat, setChat] = useState([])

  const sendChat = (e) => {
    e.preventDefault()
    socket.emit('chat', { message, username })
    setMessage('')
  }

  useEffect(() => {
    socket.on("chat", (payLoad) => {
      setChat([...chat, payLoad])
    })
  })


  return (
    <div className="App">
      <header className="App-header">
        <h1>Chatty</h1>

        {
          chat.map((payLoad, index) => {
            return (
              <p key={index}>{payLoad.message} : <span> id : {payLoad.username}</span></p>

            )
          })}




        <form onSubmit={sendChat}>
          <input type="text"
            name="chat"
            placeholder='send text'
            value={message}
            onChange={(e) => {
              setMessage(e.target.value)
            }}
          />
          <button type="submit">Send</button>
        </form>
      </header>
    </div>
  );
}

export default App;
