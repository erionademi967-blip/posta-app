const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  socket.on('bashkohu-porosise', (porosiaId) => {
    const id = String(porosiaId || 'KS-101').trim() || 'KS-101';
    socket.data.porosiaId = id;
    socket.join(id);
  });

  socket.on('dergo-koordinatat', (data) => {
    const id = socket.data.porosiaId || (data && data.porosiaId) || 'KS-101';
    io.to(id).emit('perditeso-koordinatat', data);
  });

  socket.on('ndrysho-statusin', (payload) => {
    const id =
      socket.data.porosiaId ||
      (payload && typeof payload === 'object' ? payload.porosiaId : null) ||
      'KS-101';
    const statusi = payload && typeof payload === 'object' ? payload.statusi : payload;
    io.to(id).emit('statusi-ri', statusi);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Serveri po punon në portin ${PORT}`);
});
