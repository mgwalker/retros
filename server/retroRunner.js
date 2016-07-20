class RetroRunner {
  constructor(socket, retroMetadata) {
    this.socket = socket;
    this.retro = retroMetadata;
    this.categoryIndex = 0;
    this.voting = false;
  }

  run() {
    this.categoryIndex = 0;
    this.voting = false;
    this.next();
  }

  next() {
    if (this.categoryIndex < this.retro.categories.length) {
      let delay = 0;
      if (this.voting) {
        console.log(`Voting: ${this.retro.categories[this.categoryIndex]}`);
        delay = this.retro.categoryTimes[this.retro.categories[this.categoryIndex]].voteTime;
        this.categoryIndex++;
      } else {
        console.log(`Polling: ${this.retro.categories[this.categoryIndex]}`);
        delay = this.retro.categoryTimes[this.retro.categories[this.categoryIndex]].selfTime;
      }

      this.voting = !this.voting;
      setTimeout(this.next.bind(this), delay * 60000);
    } else {
      console.log('All done!');
    }
  }
}

module.exports = RetroRunner;
