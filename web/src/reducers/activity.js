import updeep from 'updeep';
import { hashHistory } from 'react-router';
import { Activity } from '../actions';
import store from '../store';
import socket, { messages } from '../socket';

export const DefaultState = {
  timeBeforeStart: 0,
  time: {
    durationRemaining: 0,
    pctElapsed: 0
  },
  polling: '',
  voting: '',
  entries: []
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
      return updeep({ timeBeforeStart: action.value }, state);

    case Activity.StartPolling:
      console.log(`Activity.StartPolling: ${action.value}`);
      return updeep({
        polling: action.value,
        voting: '',
        entries: [''],
        timeWarning: 0
      }, state);

    case Activity.StartVoting:
      console.log(`Activity.StartVoting: ${action.value}`);
      return updeep({
        polling: '',
        voting: action.value.category,
        entries: action.value.entries.map(e => ({ name: e, votes: 0 })),
        timeWarning: 0
      }, state);

    case Activity.TimeWarning:
      return updeep({ time: {
        durationRemaining: action.value.durationRemaining,
        pctElapsed: action.value.pctElapsed
      } }, state);

    case Activity.SetPollEntry:
      {
        const newEntries = [].concat(state.entries);
        newEntries[action.value.index] = action.value.value;

        for (let i = 0; i < newEntries.length; i++) {
          if (i !== action.value.index && newEntries[i] === '') {
            newEntries.splice(i, 1);
            i--;
          }
        }

        if (newEntries[newEntries.length - 1] !== '') {
          newEntries.push('');
        }

        return updeep({ entries: newEntries }, state);
      }

    case Activity.CollectAnswers:
      socket().emit(messages.retro.submitAnswers, state.entries);
      return state;

    case Activity.CollectVotes:
      socket().emit(messages.retro.submitVotes, state.entries);
      return state;

    case Activity.VoteUp:
      {
        const totalVotes = state.entries.reduce((prev, now) => prev + now.votes, 0);
        const node = state.entries[action.value];
        if (totalVotes < 5 && node.votes < 5) {
          return updeep({ entries: { [action.value]: { votes: node.votes + 1 } } }, state);
        }
        return state;
      }

    case Activity.VoteDown:
      {
        const node = state.entries[action.value];
        if (node.votes > 0) {
          return updeep({ entries: { [action.value]: { votes: node.votes - 1 } } }, state);
        }
        return state;
      }

    case Activity.StartHappiness:
      console.log('Activity.StartHappiness');
      hashHistory.push('/retro-happiness');
      return state;

    default:
      return state;
  }
}
