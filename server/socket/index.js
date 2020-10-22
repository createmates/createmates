

module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    //when client emits create or join
    socket.on('create or join', function(room){
        console.log('create or join to room', room)
        //count number of users in room
        const currentRoom = io.sockets.adapter.rooms[room] || {length: 0}
        const numClients = currentRoom.length
        console.log(room, 'has', numClients, 'clients')

        if(numClients === 0){ //no one in the room
          socket.join(room)
          socket.emit('created', room)
        } else if( numClients === 1){ //only one user in the room
          socket.join(room)
          socket.emit('joined', room)
        } else {  //room is full  becuase both users are in the room
          socket.emit('full', room)
        }
      })


      //relay only handlers
      socket.on('matched', matchMessage => {
        socket.broadcast.emit('matched', matchMessage)
      })
      socket.on('new-message', message => {
        socket.broadcast.emit('new-message', message);
      });
      socket.on('ready', function(room){
        socket.broadcast.to(room).emit('ready')
      })
      socket.on('candidate', function(event){
        socket.broadcast.to(event.room).emit('candidate', event)
      })
      socket.on('offer', function(event){
        socket.broadcast.to(event.room).emit('offer', event.sdp)
      })
      socket.on('answer', function(event){
        socket.broadcast.to(event.room).emit('answer', event.sdp)
      })
      socket.on('finishSession', function(roomId){
        socket.broadcast.to(roomId).emit('finishSession')
      })
      socket.on('summaryUpdate', function(summaryMessage){
        socket.broadcast.to(summaryMessage.roomId).emit('summaryUpdate', summaryMessage)
      })
      socket.on('closeSession', function(roomId){
        socket.broadcast.to(roomId).emit('closeSession')
      })
     socket.on('disconnect', () => {
      console.log(`${socket.id} has left the building`)
    })
  })
}
