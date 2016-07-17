export const Owner = {
  Become: 'become owner',

  becomeOwner() {
    return { type: Owner.Become };
  }
};

export const Activity = {
  CreateRetro: 'create the retro',
  GetRetroProperties: 'get retro properties',
  AcceptRetroProperties: 'accept retro properties',

  createRetro() {
    return { type: Activity.CreateRetro };
  },

  getRetroProperties() {
    return { type: Activity.GetRetroProperties };
  },

  acceptRetroProperties() {
    return { type: Activity.AcceptRetroProperties };
  }
};

export const Retro = {
  SetRetroCategories: 'set the retro categories',
  SetTotalTime: 'set the retro total time',
  SetCategorySelfTime: 'set a retro category self time',
  SetCategoryVoteTime: 'set a retro category vote time',

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
  }
};
