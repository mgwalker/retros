/* global io */
import store from './store';
import { Owner, Retro } from './actions';
import { hashHistory } from 'react-router';

let socket;

const channelNameHash = /#\/retro\/([A-Za-z0-9-]+)/.exec(window.location.hash);
if (channelNameHash) {
  socket = io(`/${channelNameHash[1]}`);
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

  socket.on('add user', username => {
    store.dispatch(Retro.addUser(username));
  });
});

export default function () {
  return socket;
}
