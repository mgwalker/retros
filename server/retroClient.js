const messages = require('./messages');

class RetroClient {
  constructor(socket, broadcast, retroRunner) {
    this.socket = socket;
    this.owner = false;
    this.username = '';
    this.retroRunner = retroRunner;

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
      this.retroRunner.run();
    }
  }
}

module.exports = RetroClient;
