'use strict';

const PORT = 23526;
const restify = require('restify');
// const messages = require('./messages');

const server = restify.createServer({
  name: 'Restrospectives'
});
const io = require('socket.io')(server);

io.of('acqstack 101')
  .on('connection', () => {
    console.log('got acqstack conn');
  });

/*
io.on('connection', socket => {
  console.log('>> got socket connection');
  socket.emit('identify yourself');
  socket.on(messages.signUp, data => {
    console.log(':: got socket event');
    console.log(data);
  });
});
*/

server.get('/.*', restify.serveStatic({
  directory: 'web/bin',
  default: 'index.html'
}));

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
