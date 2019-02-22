/*
The chessboard is a top-level container with 3 main purposes

1. To communicate with the redux state to render the chess board and
pass a callback function to the individual tiles so that user moves
can be recorded and displayed

2. Store the ChessJS engine for validating and updating chess moves
on the board

3. Make API calls to Chess.com for fetching and storing archived games of
whatever player/user you want
*/

import React, { Component } from 'react';

import { connect } from 'react-redux';


import {
  setOrigin,
  setDestination,
  clearDest,
  clearOrigin,
  clearCoords,
  setBoard,
  fetchGames,
  getArchive,
} from '../actions';

class PGN extends Component {

  constructor(props) {
    super(props);

    this.state = {
      pgn: '',
    };
  }


  render() {
    return (
      <div className="pgn_container" >
        hi
      </div>
    );
  }
}

const mapStateToProps = state => ({ // eslint-disable-line no-unused-vars
  currentBoard: state.currentBoard,
});

export default connect(mapStateToProps,
  { setOrigin,
    setDestination,
    clearDest,
    clearOrigin,
    clearCoords,
    setBoard,
    fetchGames,
    getArchive,
  },
)(PGN);
