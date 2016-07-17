import store from './store';
import { Owner } from './actions';

let socket = io(); /* global io */

socket.on('join channel', msg => {
  socket = io(`/${msg.channel}`);
  socket.emit('take ownership', msg.secret);

  socket.on('you are owner', () => {
    store.dispatch(Owner.becomeOwner());
  });
});

export default () => socket;
