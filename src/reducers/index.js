import { combineReducers } from 'redux';

import BoardReducer from './board-reducer';
import ArchiveReducer from './archive-reducer';

const rootReducer = combineReducers({
  currentBoard: BoardReducer,
  archive: ArchiveReducer,
});

export default rootReducer;
