const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

httpServer.listen(3001);

io.engine.on('connection_error', (err) => {
  console.log(err.message); // the error message, for example "Session ID unknown"
});

module.exports = io;
