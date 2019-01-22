import { combineReducers } from 'redux';

import BoardReducer from './board-reducer';


const rootReducer = combineReducers({
  currentBoard: BoardReducer,
});

export default rootReducer;
