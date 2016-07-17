import { Activity } from '../actions';
import store from '../store';
import socket from '../socket';

export const DefaultState = {
  wait: false
};

export default function (state = DefaultState, action) {
  switch (action.type) {
    case Activity.CreateRetro:
      {
        const wholeState = store.getState();
        socket.emit('create retro', {
          categories: wholeState.retro.categories,
          categoryTimes: wholeState.retro.categoryTimes,
          happinessEnabled: wholeState.retro.happinessEnabled
        });
        return {
          wait: true
        };
      }
    default:
      return state;
  }
}
