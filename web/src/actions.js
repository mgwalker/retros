export const Owner = {
  Become: 'become owner',

  becomeOwner() {
    return { type: Owner.Become };
  }
};

export const Activity = {
  CreateRetro: 'send retro metadata to server',
  StartRetro: 'starting the retro',
  StartPolling: 'polling on a category',
  StartVoting: 'voting on a category',
  TimeWarning: 'almost out of time',
  SetPollEntry: 'set poll entry',
  CollectAnswers: 'collect answers',
  CollectVotes: 'collect votes',
  VoteUp: 'vote up',
  VoteDown: 'vote down',
  StartHappiness: 'start happiness',
  CollectHappiness: 'collect happiness',
  RetroResults: 'retro results',

  createRetro() {
    return { type: Activity.CreateRetro };
  },

  startRetro(delay) {
    return { type: Activity.StartRetro, value: delay };
  },

  startPolling(category) {
    return { type: Activity.StartPolling, value: category };
  },

  startVoting(category, entries) {
    return { type: Activity.StartVoting, value: { category, entries } };
  },

  timeWarning(durationRemaining, pctElapsed) {
    return { type: Activity.TimeWarning, value: { durationRemaining, pctElapsed } };
  },

  setPollEntry(index, value) {
    return { type: Activity.SetPollEntry, value: { index, value } };
  },

  collectAnswers() {
    return { type: Activity.CollectAnswers };
  },

  collectVotes() {
    return { type: Activity.CollectVotes };
  },

  voteUp(index) {
    return { type: Activity.VoteUp, value: index };
  },

  voteDown(index) {
    return { type: Activity.VoteDown, value: index };
  },

  startHappiness() {
    return { type: Activity.StartHappiness };
  },

  collectHappiness() {
    return { type: Activity.CollectHappiness };
  },

  retroResults(results) {
    return { type: Activity.RetroResults, value: results };
  }
};

export const Retro = {
  SetRetroCategories: 'set the retro categories',
  SetTotalTime: 'set the retro total time',
  SetCategorySelfTime: 'set a retro category self time',
  SetCategoryVoteTime: 'set a retro category vote time',
  EnableHappiness: 'set whether happiness is enabled for a retro',
  SetUsername: 'set username of retro user',
  AddUser: 'add user to retro',
  StartRetro: 'start the retro',
  SetHappinessLevel: 'set happiness level',

  setRetroCategories(retroCategories) {
    return { type: Retro.SetRetroCategories, value: retroCategories };
  },

  setTotalTime(time) {
    return { type: Retro.SetTotalTime, value: time };
  },

  setCategorySelfTime(category, time) {
    return { type: Retro.SetCategorySelfTime, value: { category, time } };
  },

  setCategoryVoteTime(category, time) {
    return { type: Retro.SetCategoryVoteTime, value: { category, time } };
  },

  setHappiness(enabled) {
    return { type: Retro.EnableHappiness, value: enabled };
  },

  setUsername(name) {
    return { type: Retro.SetUsername, value: name };
  },

  addUser(name) {
    return { type: Retro.AddUser, value: name };
  },

  startRetro() {
    return { type: Retro.StartRetro };
  },

  setHappinessLevel(level) {
    return { type: Retro.SetHappinessLevel, value: level };
  }
};
