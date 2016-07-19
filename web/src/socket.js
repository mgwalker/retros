/* global io */
import store from './store';
import { Owner, Retro } from './actions';
import { hashHistory } from 'react-router';

function subscribeSocketToEventHandlers(skt) {
  skt.on('add user', username => {
    store.dispatch(Retro.addUser(username));
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
