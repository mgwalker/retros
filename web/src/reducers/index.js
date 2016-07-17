import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import activity, { DefaultState as activityDefaultState } from './activity';
import retro, { DefaultState as retroDefaultState } from './retro';
import owner from './owner';

const stateShape = {
  activity: activityDefaultState,
  retro: retroDefaultState,
  owner: false
};

const distinctReducers = combineReducers({
  activity,
  retro,
  owner,
  routing: routerReducer
});

export default function (state = stateShape, action) {
  let newState = state;

  newState = distinctReducers(state, action);

  return newState;
}
