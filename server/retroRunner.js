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
    setTimeout(() => { this.startPolling(this.getDelays()); }, 10000);
  }

  getCurrentCategory() {
    return this.retro.categories[this.categoryIndex];
  }

  getDelays() {
    const vote = this.retro.categoryTimes[this.getCurrentCategory()].voteTime * 60000;
    const poll = this.retro.categoryTimes[this.getCurrentCategory()].selfTime * 60000;
    return {
      vote, poll
    };
  }

  startPolling(delays) {
    const category = this.getCurrentCategory();
    this.socket.emit('polling', category);
    console.log(`Polling: ${category}`);
    setTimeout(() => this.tenSecondWarning(), delays.poll - 10000);
    setTimeout(() => this.collectAnswers(delays), delays.poll);
  }

  collectAnswers(delays) {
    const category = this.getCurrentCategory();
    this.socket.emit('collect answers', category);
    console.log(`Collecting answers: ${category}`);
    setTimeout(() => this.startVoting(delays), 3000);
  }

  startVoting(delays) {
    const category = this.getCurrentCategory();
    this.socket.emit('voting', { category, entries: [] });
    console.log(`Voting: ${category}`);
    setTimeout(() => this.tenSecondWarning(), delays.vote - 10000);
    setTimeout(() => this.collectVotes(), delays.vote);
  }

  collectVotes() {
    const category = this.getCurrentCategory();
    this.socket.emit('collect votes', category);
    console.log(`Collecting votes: ${category}`);
    setTimeout(() => this.nextCategory(), 3000);
  }

  tenSecondWarning() {
    this.socket.emit('10 second warning');
    console.log('10-second warning');
  }

  nextCategory() {
    this.categoryIndex++;
    if (this.categoryIndex < this.retro.categories.length) {
      this.startPolling(this.getDelays());
    } else {
      console.log('All done!');
    }
  }
}

module.exports = RetroRunner;
