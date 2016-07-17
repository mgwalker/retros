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

  handleConnection(socket) {
    const client = new RetroClient(socket);
    this.clients.push(client);

    socket.on('take ownership', secret => {
      console.log(`requested to take ownership with secret: ${secret}`);
      if (secret === this.secret) {
        console.log('Got a new owner');
        this.clients.forEach(c => { c.owner = (c.socket === socket); }); // eslint-disable-line no-param-reassign
      }
    });
  }
}

module.exports = RetroSocket;