const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  // Kur korrieri dërgon koordinatat, ia përcjellim klientit
  socket.on('dergo-koordinatat', (data) => {
    io.emit('perditeso-koordinantat', data);
  });

  // Kur korrieri ndryshon statusin e porosisë
  socket.on('ndrysho-statusin', (statusi) => {
    io.emit('statusi-ri', statusi);
  });
});

server.listen(3000, () => {
  console.log('Aplikacioni u hap te: http://localhost:3000');
});
