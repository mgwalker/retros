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

  createRetro() {
    return { type: Activity.CreateRetro };
  },

  startRetro() {
    return { type: Activity.StartRetro };
  },

  startPolling(category) {
    return { type: Activity.StartPolling, value: category };
  },

  startVoting(category, entries) {
    return { type: Activity.StartVoting, value: { category, entries } };
  },

  timeWarning(duration) {
    return { type: Activity.TimeWarning, value: duration };
  },

  setPollEntry(index, value) {
    return { type: Activity.SetPollEntry, value: { index, value } };
  },

  collectAnswers() {
    return { type: Activity.CollectAnswers };
  },

  collectVotes() {
    return { type: Activity.CollectVotes };
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
  }
};
