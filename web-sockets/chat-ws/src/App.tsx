import { useEffect, useState, useRef } from 'react'
import './App.css'

function App() {

  const [socket, setSocket] = useState<WebSocket | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080")
    setSocket(ws);
    ws.onmessage = (e) => {
      alert(e.data);
    }
  },[])


  function sendmessage() {
    //@ts-ignore
    if(!socket){
      return;
    }
    //@ts-ignore
    const message = inputRef.current.value;
    socket.send(message);
  }


  return (
    <div>
      <input ref = {inputRef} type='text' placeholder='Send Message'></input>
      <button onClick={sendmessage}>Send</button>
    </div>
  )
}

export default App
