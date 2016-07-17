import { Activity } from '../actions';

export const DefaultState = 'unknown';

export default function (state = 'unknown', action) {
  switch (action.type) {
    case Activity.CreateRetro:
      return action.type;
    case Activity.GetRetroProperties:
      return action.type;
    case Activity.AcceptRetroProperties:
      return action.type;
    default:
      return state;
  }
}
