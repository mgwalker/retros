let socket = io(); /* global io */

socket.on('join channel', msg => {
  socket = io(`/${msg.channel}`);
});

export default () => socket;
