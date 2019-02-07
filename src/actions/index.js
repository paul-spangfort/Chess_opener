import axios from 'axios';
// keys for actiontypes
export const ActionTypes = {
  SET_BOARD: 'SET_BOARD',
  SET_ORIGIN: 'SET_ORIGIN',
  SET_DEST: 'SET_DEST',
  SET_PGN: 'SET_PGN',
  CLEAR_ORIGIN: 'CLEAR_ORIGIN',
  CLEAR_DEST: 'CLEAR_DEST',
  CLEAR: 'CLEAR',
  FETCH_GAMES: 'FETCH_GAMES',
};

function archivesUrl(username) {
  return `https://api.chess.com/pub/player/${username}/games/archives`;
}

function gamesUrl(username, month, year) {
  return `https://api.chess.com/pub/player/${username}/games/${year}/${month}`;
}

export function fetchGames(username) {
  console.log('ABout to fetch at ');
  console.log(archivesUrl(username));
  return async (dispatch) => {
    axios.get(archivesUrl(username)).then((response) => {
      if (response.status === 200) {
        console.log('Successful fetch');
        const length = response.data.archives.length;

        const date = response.data.archives[length - 1].slice(-7).split('/');
        console.log(date);
        axios.get(gamesUrl(username, date[1], date[0])).then((res) => {
          console.log('Fetched games, they are: ');
          console.log(res);
          const pgn = res.data.games[0].pgn;

          dispatch({
            type: ActionTypes.SET_PGN,
            payload: pgn,
          });
        });
      }
      console.log('This is response');
      console.log(response);
    });
  };
}

export function setOrigin(coord) {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.SET_ORIGIN,
      payload: coord,
    });
    return coord;
  };
}

export function setPGN(pgn) {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.SET_PGN,
      payload: pgn,
    });
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
