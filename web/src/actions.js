export const Owner = {
  Become: 'become owner',

  becomeOwner() {
    return { type: Owner.Become };
  }
};

export const Activity = {
  CreateRetro: 'send retro metadata to server',

  createRetro() {
    return { type: Activity.CreateRetro };
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
  }
};
