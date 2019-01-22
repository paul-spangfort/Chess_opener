import { ActionTypes } from '../actions';

// simple reducer used only on initial render to check if user is on a mobile
// device or a desktop comp
const BoardReducer = (state = { origin: null, dest: null }, action) => {
  switch (action.type) {

    case ActionTypes.SET_ORIGIN:
      return Object.assign({}, state, {
        origin: action.payload.origin,
      });

    case ActionTypes.SET_DEST:
      return Object.assign({}, state, {
        dest: action.payload.dest,
      });

    case ActionTypes.CLEAR:
      return Object.assign({}, state, {
        dest: null,
        origin: null,
      });

    default:
      return state;
  }
};

export default BoardReducer;
