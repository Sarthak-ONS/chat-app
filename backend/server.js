const express = require('express')

const app = express()


const server = require('http').createServer(app)

const io = require('socket.io')(server, {
    cors: {
        origin: "*",
    }
})


io.on("connection", (socket) => {
    console.log(socket);
    console.log("Socket is active noww");


    socket.on("chat", (payLoad) => {
        console.log("Thiss is payload", payLoad);
        io.emit("chat", payLoad)
    })

})

server.listen(4000, () => {
    console.log("Successfully Connected Server on port 4000");
})