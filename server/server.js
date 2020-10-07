const express = require("express");
const path = require('path')
const app = express();

let broadcaster


const http = require('http')
const server = http.createServer(app)



const io = require("socket.io")(server)
app.use(express.static(path.join(__dirname, "..", "public")))

io.sockets.on("connection", socket => {
    console.log("socket has connected")
    socket.on("broadcaster", () => {
        broadcaster = socket.id
        socket.broadcast.emit("broadcaster")
    });
    socket.on("watcher", () => {
        socket.to(broadcaster).emit("watcher", socket.id);
    });
    socket.on("disconnect", () => {
        console.log('sockect has left the building')
        socket.to(broadcaster).emit("disconnectPeer", socket.id)
    })
    socket.on("offer", (id, message) => {
        socket.to(id).emit("offer", socket.id, message);
    });
    socket.on("answer", (id, message) => {
      socket.to(id).emit("answer", socket.id, message);
    });
    socket.on("candidate", (id, message) => {
      socket.to(id).emit("candidate", socket.id, message);
    });
})



const port = 3000
io.sockets.on("error", e => console.log(e))
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})