class RetroRunner {
  constructor(socket, retroMetadata) {
    this.socket = socket;
    this.retro = retroMetadata;
    this.categoryIndex = 0;
    this.voting = false;
  }

  run() {
    this.socket.emit('starting retro', 10);
    this.categoryIndex = 0;
    this.voting = false;
    setTimeout(this.next.bind(this), 10000);
  }

  next() {
    if (this.categoryIndex < this.retro.categories.length) {
      const category = this.retro.categories[this.categoryIndex];
      let delay = 0;

      if (this.voting) {
        this.socket.emit('voting', { category, entries: [] });
        console.log(`Voting: ${category}`);
        delay = this.retro.categoryTimes[category].voteTime;
        this.categoryIndex++;
      } else {
        this.socket.emit('polling', category);
        console.log(`Polling: ${category}`);
        delay = this.retro.categoryTimes[category].selfTime;
      }

      this.voting = !this.voting;
      delay = delay * 60000;
      setTimeout(() => { this.socket.emit('10 second warning'); }, delay - 10000);
      setTimeout(this.next.bind(this), delay);
    } else {
      console.log('All done!');
    }
  }
}

module.exports = RetroRunner;
