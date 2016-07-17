import { Owner } from '../actions';

export default function (state = false, action) {
  if (action.type === Owner.Become) {
    console.log('becoming owner!!!');
    return true;
  }
  return state;
}
