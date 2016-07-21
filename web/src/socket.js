/* global io */
import store from './store';
import { Activity, Owner, Retro } from './actions';
import { hashHistory } from 'react-router';

function subscribeSocketToEventHandlers(skt) {
  skt.on('add user', username => {
    store.dispatch(Retro.addUser(username));
  });

  skt.on('starting retro', () => {
    store.dispatch(Activity.startRetro());
  });

  skt.on('polling', category => {
    console.log(`Polling for ${category}`);
    store.dispatch(Activity.startPolling(category));
  });

  skt.on('voting', msg => {
    console.log(`Voting for ${msg.category}`);
    store.dispatch(Activity.startVoting(msg.category, msg.entries));
  });

  skt.on('10 second warning', () => {
    console.log('10-second warning!');
    store.dispatch(Activity.timeWarning(10));
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

socket.on('join channel', msg => {
  socket = io(`/${msg.channel}`);
  socket.emit('take ownership', msg.secret);

  socket.on('you are owner', () => {
    store.dispatch(Owner.becomeOwner());
  });

  socket.on('wait for start', () => {
    hashHistory.push(`/retro/${msg.channel}`);
  });

  subscribeSocketToEventHandlers(socket);
});

export default function () {
  return socket;
}
