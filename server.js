const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Serve the static files
app.use(express.static(__dirname ));

// Handle incoming WebSocket connections
io.on('connection', socket => {
  // Handle offer message
  socket.on('offer', offer => {
    // Broadcast offer to all other connected clients except the sender
    socket.broadcast.emit('incoming-call', offer);
  });

  // Handle answer message
  socket.on('answer', answer => {
    // Broadcast answer to all other connected clients except the sender
    socket.broadcast.emit('answer', answer);
  });

  // Handle ICE candidate message
  socket.on('ice-candidate', candidate => {
    // Broadcast ICE candidate to all other connected clients except the sender
    socket.broadcast.emit('ice-candidate', candidate);
  });
});

// Start the server
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(__dirname );
  console.log(`Server running on port ${port}`);
});
