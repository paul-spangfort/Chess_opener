import { ActionTypes } from '../actions';

// simple reducer used only on initial render to check if user is on a mobile
// device or a desktop comp
const BoardReducer = (state = { origin: null, dest: null, board: [], pgn: null }, action) => {
  switch (action.type) {

    case ActionTypes.SET_BOARD:
      return Object.assign({}, state, {
        board: action.payload,
      });

    case ActionTypes.SET_PGN:
      return Object.assign({}, state, {
        pgn: action.payload,
      });

    case ActionTypes.SET_ORIGIN:
      return Object.assign({}, state, {
        origin: action.payload,
      });

    case ActionTypes.SET_DEST:
      return Object.assign({}, state, {
        dest: action.payload,
      });

    case ActionTypes.CLEAR_ORIGIN:
      return Object.assign({}, state, {
        origin: null,
      });

    case ActionTypes.CLEAR_DEST:
      return Object.assign({}, state, {
        dest: null,
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
