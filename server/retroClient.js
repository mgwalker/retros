const messages = require('./messages');

class RetroClient {
  constructor(socket, broadcast) {
    this.socket = socket;
    this.owner = false;
    this.username = '';

    socket.on(messages.action.setUsername, this.setName.bind(this));
    socket.on(messages.action.startRetro, this.startRetro.bind(this));

    socket.emit(messages.action.waitForStart);
    this.broadcast = broadcast;
  }

  setName(name) {
    this.username = name;
    this.broadcast(messages.action.addUser, name);
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
