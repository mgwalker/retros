import store from './store';
import { Owner, Retro } from './actions';
import { hashHistory } from 'react-router';

let socket = io(); /* global io */

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
