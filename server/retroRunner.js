const messages = require('./messages');

function shuffle(list) {
  const result = [].concat(list);
  for (let i = 0; i < result.length; i++) {
    const target = result.length - 1 - i;
    const swap = Math.floor(Math.random() * (result.length));
    const temp = result[target];
    result[target] = result[swap];
    result[swap] = temp;
  }
  return result;
}

class RetroRunner {
  constructor(socket, retroMetadata) {
    this.socket = socket;
    this.retro = retroMetadata;
    this.categoryIndex = 0;
    this.voting = false;

    this.answers = [];
    this.votes = { };
  }

  run() {
    this.socket.emit(messages.retro.starting, 10);
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
    this.socket.emit(messages.retro.polling, category);
    console.log(`Polling: ${category}`);
    setTimeout(() => this.tenSecondWarning(), delays.poll - 10000);
    setTimeout(() => this.collectAnswers(delays), delays.poll);
  }

  collectAnswers(delays) {
    const category = this.getCurrentCategory();
    this.answers.length = 0;
    this.socket.emit(messages.retro.collectAnswers, category);
    console.log(`Collecting answers: ${category}`);
    setTimeout(() => this.startVoting(delays), 3000);
  }

  startVoting(delays) {
    const category = this.getCurrentCategory();
    this.socket.emit(messages.retro.voting, { category, entries: shuffle(this.answers) });
    console.log(`Voting: ${category}`);
    setTimeout(() => this.tenSecondWarning(), delays.vote - 10000);
    setTimeout(() => this.collectVotes(), delays.vote);
  }

  collectVotes() {
    const category = this.getCurrentCategory();
    this.socket.emit(messages.retro.collectVotes, category);
    console.log(`Collecting votes: ${category}`);
    setTimeout(() => this.nextCategory(), 3000);
  }

  tenSecondWarning() {
    this.socket.emit(messages.retro.tenSecondWarning);
    console.log('10-second warning');
  }

  nextCategory() {
    this.categoryIndex++;
    if (this.categoryIndex < this.retro.categories.length) {
      this.startPolling(this.getDelays());
    } else {
      this.sendResults();
      console.log('All done!');
    }
  }

  sendResults() {
    const entries = { };
    Object.keys(this.votes).forEach(category => {
      entries[category] = [];
      Object.keys(this.votes[category]).forEach(answer => {
        entries[category].push({ name: answer, votes: this.votes[category][answer] });
      });
      entries[category].sort((a, b) => a.votes < b.votes);
    });
    this.socket.emit(messages.retro.results, entries);
  }

  mergeAnswers(clientAnswers) {
    this.answers = this.answers.concat(clientAnswers.filter(a => !!a));
  }

  mergeVotes(clientVotes) {
    const category = this.getCurrentCategory();
    if (!this.votes[category]) {
      this.votes[category] = { };
    }

    clientVotes.forEach(item => {
      if (!this.votes[category][item.name]) {
        this.votes[category][item.name] = item.votes;
      } else {
        this.votes[category][item.name] += item.votes;
      }
    });
  }
}

module.exports = RetroRunner;
