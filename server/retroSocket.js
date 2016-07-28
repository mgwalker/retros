const RetroClient = require('./retroClient');
const RetroRunner = require('./retroRunner');
const messages = require('./messages');

class RetroSocket {
  constructor(retroMetadata, channel, secret) {
    this.ioChannel = null;
    this.channel = channel;
    this.secret = secret;
    this.clients = [];
    this.retroMetadata = retroMetadata;
  }

  createChannel(io) {
    this.ioChannel = io.of(this.channel);
    this.ioChannel.on('connection', this.handleConnection.bind(this));
    this.retroRunner = new RetroRunner(this.ioChannel, this.retroMetadata);
  }

  broadcast(...args) {
    this.ioChannel.emit(...args);
  }

  handleConnection(socket) {
    const client = new RetroClient(socket, this.broadcast.bind(this), this.retroRunner);
    this.clients.push(client);

    // Send all the existing users to the new client
    this.clients.forEach(c => {
      if (c.username) {
        socket.emit(messages.action.addUser, c.username);
      }
    });

    socket.on(messages.action.takeOwnership, secret => {
      if (secret === this.secret) {
        this.clients.forEach(c => { c.owner = (c.socket === socket); }); // eslint-disable-line no-param-reassign
        socket.emit(messages.action.announceOwnership);
      }
    });
  }
}

module.exports = RetroSocket;
