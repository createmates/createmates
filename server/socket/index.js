module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
      socket.on('join-room', (roomId, userId) => {
          console.log('roomid',roomId, 'userId',userId)
          socket.join(roomId)
          socket.to(roomId).broadcast.emit("user-connected", userId)
          socket.on('disconnect', () => {
            console.log(`Connection ${socket.id} has left the building`)
            socket.to(roomId).broadcast.emit('user-disconnected',  userId)
          })
      })
  })
}