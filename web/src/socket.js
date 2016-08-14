/* global io */
import store from './store';
import { Activity, Owner, Retro } from './actions';
import { browserHistory } from 'react-router';
import socketMessages from '../../server/messages';

function runForDuration(actionFn, duration) {
  store.dispatch(Activity.timeWarning(duration));
  const timerStart = new Date();
  const countdown = setInterval(() => {
    const elapsed = Math.round(((new Date()) - timerStart));
    if (elapsed < duration) {
      store.dispatch(Activity.timeWarning(Math.round((duration - elapsed) / 1000), (elapsed / duration)));
    } else {
      clearInterval(countdown);
    }
  }, 250);
}

function subscribeSocketToEventHandlers(skt) {
  skt.on('add user', username => {
    store.dispatch(Retro.addUser(username));
  });

  skt.on(socketMessages.retro.starting, (delay) => {
    store.dispatch(Activity.startRetro(delay));

    const timerStart = new Date();
    const countdown = setInterval(() => {
      const elapsed = Math.round(((new Date()) - timerStart) / 1000);
      if (elapsed < delay) {
        store.dispatch(Activity.startRetro(delay - elapsed));
      } else {
        clearInterval(countdown);
      }
    }, 250);
  });

  skt.on(socketMessages.retro.polling, msg => {
    console.log(`Polling for ${msg.category}`);
    store.dispatch(Activity.startPolling(msg.category));
    runForDuration(Activity.timeWarning, msg.time);
  });

  skt.on(socketMessages.retro.voting, msg => {
    console.log(`Voting for ${msg.category}`);
    store.dispatch(Activity.startVoting(msg.category, msg.entries));
    runForDuration(Activity.timeWarning, msg.time);
  });

  skt.on(socketMessages.retro.collectAnswers, () => {
    store.dispatch(Activity.collectAnswers());
  });

  skt.on(socketMessages.retro.collectVotes, () => {
    store.dispatch(Activity.collectVotes());
  });

  skt.on(socketMessages.retro.happiness, () => {
    console.log('Poll user happiness');
    store.dispatch(Activity.startHappiness());
  });

  skt.on(socketMessages.retro.collectHappiness, () => {
    console.log('Asked to submit happiness');
    store.dispatch(Activity.collectHappiness());
  });

  skt.on(socketMessages.retro.results, results => {
    store.dispatch(Activity.retroResults(results));
  });
}

let socket;

const channelNameHash = /\/retro\/([A-Za-z0-9-]+)\/?/.exec(window.location.pathname);
if (channelNameHash) {
  socket = io(`/${channelNameHash[1]}`);
  subscribeSocketToEventHandlers(socket);
} else {
  socket = io();
}

socket.on(socketMessages.action.joinChannel, msg => {
  socket = io(`/${msg.channel}`);
  socket.emit(socketMessages.action.takeOwnership, msg.secret);

  socket.on(socketMessages.action.announceOwnership, () => {
    store.dispatch(Owner.becomeOwner());
  });

  socket.on(socketMessages.action.waitForStart, () => {
    browserHistory.push(`/retro/${msg.channel}`);
  });

  subscribeSocketToEventHandlers(socket);
});

export default function () {
  return socket;
}

export const messages = socketMessages;
