class RetroClient {
  constructor(socket) {
    this.socket = socket;
    this.owner = false;
    this.username = '';

    socket.on('set name', this.setName);
    socket.on('start retro', this.startRetro);
  }

  setName(name) {
    this.username = name;
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
