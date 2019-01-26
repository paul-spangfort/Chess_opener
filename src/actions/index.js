// keys for actiontypes
export const ActionTypes = {
  SET_ORIGIN: 'SET_ORIGIN',
  SET_DEST: 'SET_DEST',
  CLEAR: 'CLEAR',
};


export function setOrigin(coord) {
  console.log(`Hi, in here ${coord}`);
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_ORIGIN,
      payload: coord,
    });
  };
}

export function setDestination(coord) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_DEST,
      payload: coord,
    });
  };
}


export function clearOrigin() {
  return {
    type: ActionTypes.CLEAR,
    payload: null,
  };
}


export function resetSignUpError() {
  return (dispatch) => {
    dispatch({ type: ActionTypes.EMAIL_APPROVED });
  };
}
