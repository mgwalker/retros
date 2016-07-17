let socket = io(); /* global io */

socket.on('join channel', msg => {
  socket = io(`/${msg.channel}`);
  socket.emit('take ownership', msg.secret);
});

export default () => socket;
