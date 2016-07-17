import { Owner } from '../actions';

export const DefaultState = false;

export default function (state = DefaultState, action) {
  if (action.type === Owner.Become) {
    return true;
  }
  return state;
}
