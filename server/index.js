const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')
const {Server} = require('socket.io')

const server = http.createServer(app)
app.use(cors())


const io = new Server(server,{
   cors:{
    origin:'http://localhost:3000',
    methods: ["GET","POST"]
   }
})

//listen for events
io.on("connection", (socket)=> {
console.log(`user connected ${socket.id}`)

socket.on("send_message", (data)=>{
  socket.broadcast.emit("receive_message", data)
})

})
server.listen(4000, ()=>console.log('server running on port 4000'))