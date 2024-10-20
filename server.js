// Import the required modules
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

// Initialize the Express app and create an HTTP server
const app = express();
const server = http.createServer(app);

// Set up Socket.IO to work with the HTTP server
const io = new Server(server);

// Serve the HTML file for the chat interface
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle new client connections to the server
io.on('connection', (socket) => {
  console.log('A user connected');

  // Broadcast messages sent by clients to everyone, including the sender
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  // Log and notify when a user disconnects
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start the server on port 3000
server.listen(3000, () => {
  console.log('Server listening on port 3000');
});