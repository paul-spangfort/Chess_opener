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
  GET_ARCHIVE: 'GET_ARCHIVE',
  SET_GAMES: 'SET_GAMES',
  FINISHED_LOADING: 'FINISHED_LOADING',
  START_LOADING: 'START_LOADING',
};

function archivesUrl(username) {
  return `https://api.chess.com/pub/player/${username}/games/archives`;
}

function gamesUrl(username, month, year) {
  return `https://api.chess.com/pub/player/${username}/games/${year}/${month}`;
}

function processGame(game) {
  const players = {
    white: game.white,
    black: game.black,
  };

  const pgn = game.pgn.split(/\r?\n/).slice(-1)[0].replace(/\{([^}]+)\}/g, '');

  return { players, pgn };
}

export function fetchGames(username) {
  console.log('ABout to fetch at ');
  console.log(archivesUrl(username));
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.START_LOADING,
    });

    axios.get(archivesUrl(username)).then((response) => {
      if (response.status === 200) {
        console.log('Successful fetch');

        const length = response.data.archives.length;
        const date = response.data.archives[length - 1].slice(-7).split('/');

        // console.log(date);
        axios.get(gamesUrl(username, date[1], date[0])).then((res) => {
          console.log('Fetched games, they are: ');
          console.log(res);

          const pgn = res.data.games[0].pgn.split(/\r?\n/).slice(-1)[0].replace(/\{([^}]+)\}/g, '');

          console.log(pgn);

          const games = [];

          res.data.games.forEach((g) => {
            const game = processGame(g);
            games.push(game);
          });

          console.log(games);

          console.log('This is game');

          dispatch({
            type: ActionTypes.SET_GAMES,
            payload: games,
          });

          dispatch({
            type: ActionTypes.FINISHED_LOADING,
          });
        });
      }
    });
  };
}

export function getArchive(username) {
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
          const games = res.data.games;
          dispatch({
            type: ActionTypes.GET_ARCHIVE,
            payload: games,
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
