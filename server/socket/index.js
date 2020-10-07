let  broadcaster

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log(
      `A socket connection to the server has been made: ${socket.id}`
    );
    socket.on("disconnect", () => {
      console.log(`Connection ${socket.id} has left the building`);
    });
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
  });
};
