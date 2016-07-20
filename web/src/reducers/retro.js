import { Retro } from '../actions';
import updeep from 'updeep';
import socket from '../socket';

export const DefaultState = {
  channel: '',
  categories: [],
  categoryTimes: {},
  happinessEnabled: false,
  totalTime: '5',
  minimumTime: 1,
  username: '',
  users: []
};

function getCategoryTimes(totalTime, categories) {
  const times = { };
  const unitTime = Math.round(100 * totalTime / (categories.length * 1.5)) / 100;

  categories.forEach(category => {
    times[category] = {
      selfTime: unitTime,
      voteTime: unitTime / 2
    };
  });
  return times;
}

function getTotalTime(categoryTimes) {
  let total = 0;
  Object.keys(categoryTimes).forEach(c => {
    total += Number(categoryTimes[c].selfTime) + Number(categoryTimes[c].voteTime);
  });
  return Math.round(100 * total) / 100;
}

export default function (state = DefaultState, action) {
  switch (action.type) {
    case Retro.SetRetroCategories:
      if (Array.isArray(action.value)) {
        const minimumTime = Math.ceil(action.value.length * 1.5);
        const totalTime = (state.totalTime < minimumTime) ? minimumTime : state.totalTime;
        return updeep({ totalTime, minimumTime, categories: action.value, categoryTimes: getCategoryTimes(totalTime, action.value) }, state);
      }
      return state;

    case Retro.SetTotalTime:
      {
        let totalTime = state.totalTime;
        if (action.value && !Number.isNaN(Number(action.value))) {
          totalTime = action.value;
        }
        if (Number(totalTime) < 1) {
          totalTime = '1';
        }
        return updeep({ totalTime, categoryTimes: getCategoryTimes(totalTime, state.categories) }, state);
      }

    case Retro.SetCategorySelfTime:
      {
        let selfTime = state.categoryTimes[action.value.category].selfTime;
        if (action.value.time && !Number.isNaN(Number(action.value.time))) {
          selfTime = action.value.time;
        }
        if (Number(selfTime) < 1) {
          selfTime = '1';
        }

        const update = { categoryTimes: { } };
        update.categoryTimes[action.value.category] = { selfTime };
        const newState = updeep(update, state);
        return updeep({ totalTime: String(getTotalTime(newState.categoryTimes)) }, newState);
      }

    case Retro.SetCategoryVoteTime:
      {
        let voteTime = state.categoryTimes[action.value.category].voteTime;
        if (action.value.time && !Number.isNaN(Number(action.value.time))) {
          voteTime = action.value.time;
        }
        if (Number(voteTime) < 0.5) {
          voteTime = '0.5';
        }

        const update = { categoryTimes: { } };
        update.categoryTimes[action.value.category] = { voteTime };
        const newState = updeep(update, state);
        return updeep({ totalTime: String(getTotalTime(newState.categoryTimes)) }, newState);
      }

    case Retro.EnableHappiness:
      return updeep({ happinessEnabled: action.value }, state);

    case Retro.SetUsername:
      socket().emit('set username', action.value);
      return updeep({ username: action.value }, state);

    case Retro.AddUser:
      {
        const users = [].concat(state.users);
        users.push(action.value);
        return updeep({ users }, state);
      }

    case Retro.StartRetro:
      socket().emit('start retro');
      return state;

    default:
      return state;
  }
}
