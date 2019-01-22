// keys for actiontypes
export const ActionTypes = {
  ORIGIN: 'SET_ORIGIN',
  DESTINATION: 'SET_DEST',
  CLEAR: 'CLEAR',
};


export function setOrigin(coord) {
  return {
    type: ActionTypes.SET_ORIGIN,
    payload: coord,
  };
}

export function setDestination(coord) {
  return {
    type: ActionTypes.SET_DEST,
    payload: coord,
  };
}

export function clearOrigin() {
  return {
    type: ActionTypes.CLEAR,
    payload: null,
  };
}
