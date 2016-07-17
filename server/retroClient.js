class RetroClient {
  constructor(socket, broadcast) {
    this.socket = socket;
    this.owner = false;
    this.username = '';

    socket.on('set username', this.setName.bind(this));
    socket.on('start retro', this.startRetro.bind(this));

    socket.emit('wait for start');
    this.broadcast = broadcast;
  }

  setName(name) {
    this.username = name;
    this.socket.emit('add user', name);
  }

  startRetro() {
    if (this.owner) {
      console.log('Owner wants to start the retro');
    } else {
      console.log('You\'re not my supervisor!');
    }
  }
}

module.exports = RetroClient;
