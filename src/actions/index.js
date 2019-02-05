// keys for actiontypes
export const ActionTypes = {
  SET_BOARD: 'SET_BOARD',
  SET_ORIGIN: 'SET_ORIGIN',
  SET_DEST: 'SET_DEST',
  CLEAR_ORIGIN: 'CLEAR_ORIGIN',
  CLEAR_DEST: 'CLEAR_DEST',
  CLEAR: 'CLEAR',
};


export function setOrigin(coord) {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.SET_ORIGIN,
      payload: coord,
    });
    return coord;
  };
}

export function setDestination(coord) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_DEST,
      payload: coord,
    });
    return coord;
  };
}


export function setBoard(board) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_BOARD,
      payload: board,
    });
    return board;
  };
}

export function clearOrigin() {
  return {
    type: ActionTypes.CLEAR_ORIGIN,
  };
}

export function clearDest() {
  return {
    type: ActionTypes.CLEAR_DEST,
  };
}

export function clearCoords() {
  return {
    type: ActionTypes.CLEAR,
  };
}


export function resetSignUpError() {
  return (dispatch) => {
    dispatch({ type: ActionTypes.EMAIL_APPROVED });
  };
}
