import io from 'socket.io-client'
import {useEffect,useState} from 'react'
const socket = io.connect("http://localhost:4000")


function App() {
  const [message,setMessage] = useState('')
  const [messageReceived,setMessageReceived] = useState('')
  const sendMessage = () => {
   socket.emit("send_message",{message})
  }
  useEffect(() => {
   socket.on("receive_message",(data) => {
    setMessageReceived(data.message)
    
   })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[socket])
  return (
    <div className="App">
     <input type="text" placeholder='type message' onChange={(event)=>{
      setMessage(event.target.value)
     }}/>
     <button onClick={sendMessage}>Send message</button>

     <h1>message:</h1>
     {messageReceived}
    </div>
  );
}

export default App;
