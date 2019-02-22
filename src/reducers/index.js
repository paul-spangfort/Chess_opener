import { combineReducers } from 'redux';

import BoardReducer from './board-reducer';
import ArchiveReducer from './archive-reducer';
import StatusReducer from './status-reducer';


const rootReducer = combineReducers({
  currentBoard: BoardReducer,
  archive: ArchiveReducer,
  status: StatusReducer,
});

export default rootReducer;
