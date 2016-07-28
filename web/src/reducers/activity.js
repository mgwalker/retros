import updeep from 'updeep';
import { hashHistory } from 'react-router';
import { Activity } from '../actions';
import store from '../store';
import socket, { messages } from '../socket';

export const DefaultState = {
  timeWarning: 0,
  polling: '',
  voting: {
    category: '',
    entries: []
  }
};

export default function (state = DefaultState, action) {
  switch (action.type) {
    case Activity.CreateRetro:
      {
        const wholeState = store.getState();
        socket().emit(messages.action.createRetro, {
          categories: wholeState.retro.categories,
          categoryTimes: wholeState.retro.categoryTimes,
          happinessEnabled: wholeState.retro.happinessEnabled
        });
        return state;
      }

    case Activity.StartRetro:
      hashHistory.push('/retro-running');
      return state;

    case Activity.StartPolling:
      console.log(`Activity.StartPolling: ${action.value}`);
      return updeep({
        polling: action.value,
        voting: {
          category: '',
          entries: []
        },
        timeWarning: 0
      }, state);

    case Activity.StartVoting:
      console.log(`Activity.StartVoting: ${action.value}`);
      return updeep({
        polling: '',
        voting: {
          category: action.value.category,
          entries: action.value.entries
        },
        timeWarning: 0
      }, state);
    case Activity.TimeWarning:
      return updeep({ timeWarning: action.value }, state);

    default:
      return state;
  }
}
