/* global io */
import store from './store';
import { Activity, Owner, Retro } from './actions';
import { hashHistory } from 'react-router';
import socketMessages from '../../server/messages';

function subscribeSocketToEventHandlers(skt) {
  skt.on('add user', username => {
    store.dispatch(Retro.addUser(username));
  });

  skt.on(socketMessages.retro.starting, () => {
    store.dispatch(Activity.startRetro());
  });

  skt.on(socketMessages.retro.polling, category => {
    console.log(`Polling for ${category}`);
    store.dispatch(Activity.startPolling(category));
  });

  skt.on(socketMessages.retro.voting, msg => {
    console.log(`Voting for ${msg.category}`);
    store.dispatch(Activity.startVoting(msg.category, msg.entries));
  });

  skt.on(socketMessages.retro.tenSecondWarning, () => {
    console.log('10-second warning!');
    const warningTime = 10;
    store.dispatch(Activity.timeWarning(warningTime));

    const timerStart = new Date();
    const countdown = setInterval(() => {
      const elapsed = Math.round(((new Date()) - timerStart) / 1000);
      if (elapsed < 10) {
        store.dispatch(Activity.timeWarning(warningTime - elapsed));
      } else {
        clearInterval(countdown);
      }
    }, 250);
  });

  skt.on(socketMessages.retro.collectAnswers, () => {
    store.dispatch(Activity.collectAnswers());
  });

  skt.on(socketMessages.retro.collectVotes, () => {
    store.dispatch(Activity.collectVotes());
  });

  skt.on(socketMessages.retro.results, results => {
    store.dispatch(Activity.retroResults(results));
  });
}

let socket;

const channelNameHash = /#\/retro\/([A-Za-z0-9-]+)/.exec(window.location.hash);
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
    hashHistory.push(`/retro/${msg.channel}`);
  });

  subscribeSocketToEventHandlers(socket);
});

export default function () {
  return socket;
}

export const messages = socketMessages;
