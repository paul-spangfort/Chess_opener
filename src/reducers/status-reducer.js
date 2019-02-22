import { ActionTypes } from '../actions';

// simple reducer used only on initial render to check if user is on a mobile
// device or a desktop comp
const StatusReducer = (state = { status: 'FINISHED' }, action) => {
  switch (action.type) {

    case ActionTypes.FINISHED_LOADING:
      return Object.assign({}, state, {
        status: 'FINISHED',
      });

    case ActionTypes.START_LOADING:
      return Object.assign({}, state, {
        status: 'LOADING',
      });


    default:
      return state;
  }
};

export default StatusReducer;
