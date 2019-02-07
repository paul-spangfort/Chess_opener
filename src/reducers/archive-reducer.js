import { ActionTypes } from '../actions';

// simple reducer used only on initial render to check if user is on a mobile
// device or a desktop comp
const ArchiveReducer = (state = { games: null }, action) => {
  switch (action.type) {

    case ActionTypes.SET_GAMES:
      return Object.assign({}, state, {
        games: action.payload,
      });

    default:
      return state;
  }
};

export default ArchiveReducer;
