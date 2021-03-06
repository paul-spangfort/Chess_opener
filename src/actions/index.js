import axios from 'axios';
import random from 'math-random';
import Chess from 'chess.js';
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

const NUM_GAMES = 5;
const OFFLINE = false;
// const OFFLINE = true;

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

  const info = game.pgn.split(/\r?\n/);

  const pgn = info.slice(-1)[0].replace(/\{([^}]+)\}/g, '');
  const opening = info[8].split('/').slice(-1)[0].slice(4, -2);

  return { opening, players, pgn };
}

const opponents = [
  'Opp 1',
  'Opp 2',
  'Opp 3',
  'Opp 4',
  'Opp 5',
  'Opp 6',
  'Opp 7',
  'Opp 8',
  'Opp 9',
  'Opp 10',
  'Opp 11'];

const openings = [];

for (let j = 0; j < 10; j += 1) {
  let letter = 'A';
  let constant = 0;

  if (j % 5 === 0) {
    letter = 'B';
    constant = 5;
  }

  openings.push(letter + (j - constant));
}

console.log('Top');
console.log(openings);

opponents.pop();

export function generateRandomGames(username = 'kingraoul') {
  // const games = [];

  const engine = new Chess();

  const games = [];
  for (let i = 0; i < NUM_GAMES; i += 1) {
    const randVal = random();
    const randIndex = Math.floor(random() * 10);
    const randOpp = opponents[randIndex];
    const randPGN = Math.floor(random() * 26);
    let players = {};

    // Set random players
    if (randVal >= 0.5) {
      players = {
        white: username,
        black: randOpp,
      };
    } else {
      players = {
        black: username,
        white: randOpp,
      };
    }

    // Set random pgn
    engine.reset();
    console.log('random moves');
    for (let k = 0; k < randVal * randPGN; k += 1) {
      const n = Math.floor(randVal * engine.moves().length);

      engine.move(engine.moves()[n]);
    }

    const pgn = engine.pgn();

    // Pick randomly generated opening
    const opening = openings[Math.floor(random() * openings.length)];

    /*
    console.log('this israndom pgn');
    console.log(pgn);
    */

    const result = {
      players,
      pgn,
      opening,
    };

    games.push(result);
  }

  return games;
}


export function RandomGame(username = 'kingraoul') {
  let randVal = random(10);
  randVal += 0;
  return randVal;
}

export function fetchGames(username) {
  if (OFFLINE) {
    return async (dispatch) => {
      const games = generateRandomGames();
      console.log('randoms');
      console.log(games);
      dispatch({
        type: ActionTypes.SET_GAMES,
        payload: games,
      });
    };
  }
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
          // console.log('Fetched games, they are: ');
          // console.log(res);

          // const opening = res.data.games[0].pgn.split(/\r?\n/)[8];

          console.log('Single game');
          // console.log(pgn);

          const games = [];

          res.data.games.forEach((g) => {
            const game = processGame(g);
            games.push(game);
          });

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
