const RetroClient = require('./retroClient');

class RetroSocket {
  constructor(channel, secret) {
    this.ioChannel = null;
    this.channel = channel;
    this.secret = secret;
    this.clients = [];
  }

  createChannel(io) {
    this.ioChannel = io.of(this.channel);
    this.ioChannel.on('connection', this.handleConnection.bind(this));
  }

  broadcast(...args) {
    this.ioChannel.emit(...args);
  }

  handleConnection(socket) {
    const client = new RetroClient(socket, this.broadcast.bind(this));
    this.clients.push(client);

    // Send all the existing users to the new client
    this.clients.forEach(c => {
      if (c.username) {
        socket.emit('add user', c.username);
      }
    });

    socket.on('take ownership', secret => {
      if (secret === this.secret) {
        this.clients.forEach(c => { c.owner = (c.socket === socket); }); // eslint-disable-line no-param-reassign
        socket.emit('you are owner');
      }
    });
  }
}

module.exports = RetroSocket;
