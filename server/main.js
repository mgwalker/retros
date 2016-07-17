'use strict';

const PORT = 23526;
const restify = require('restify');
const shortid = require('shortid');
const uuid = require('uuid');
// const messages = require('./messages');

const server = restify.createServer({
  name: 'Restrospectives'
});
const io = require('socket.io')(server);

io.on('connection', socket => {
  socket.on('create retro', msg => {
    const channel = shortid.generate();
    const secret = uuid.v4();
    socket.emit('join channel', { channel, secret });
    io.of(`/${channel}`)
      .on('connection', () => {
        console.log('yay, switched over to the retro channel!');
      });
    console.log(msg);
  });
});

server.get('/.*', restify.serveStatic({
  directory: 'web/bin',
  default: 'index.html'
}));

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
