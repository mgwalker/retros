'use strict';

const PORT = process.env.PORT || 23526;
const restify = require('restify');
const shortid = require('shortid');
const uuid = require('uuid');
const RetroSocket = require('./retroSocket');
const messages = require('./messages');

const server = restify.createServer({
  name: 'Restrospectives'
});
const io = require('socket.io')(server.server);

io.on('connection', socket => {
  socket.on(messages.action.createRetro, msg => {
    const channel = shortid.generate();
    const secret = uuid.v4();
    const retro = new RetroSocket(msg, channel, secret);

    retro.createChannel(io);
    socket.emit(messages.action.joinChannel, { channel, secret });

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
