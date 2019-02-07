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
import Chess from 'chess.js';

import { connect } from 'react-redux';

import Tile from './tile';

import { intToCoord } from '../helper_functions';

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

class Chessboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      engine: new Chess(),
    };

    this.onClick = this.onClick.bind(this);
    this.getBoard = this.getBoard.bind(this);
    this.updateSelect = this.updateSelect.bind(this);
  }

  componentWillMount() {
    this.props.setBoard(this.getBoard());
    this.props.fetchGames('kingraoul');
  }

  onClick(tile) {
    this.updateSelect(tile);
  }

  // Check internal engine to find which tiles have pieces on them
  // and return them in an array
  getBoard() {
    const tiles = [];

    for (let i = 0; i < 64; i += 1) {
      const tile = {};

      const coord = intToCoord(i);
      const piece = this.state.engine.get(coord);

      tile.coordinate = coord;

      if (piece) {
        tile.piece = piece;
      }

      tiles.push(tile);
    }

    return tiles;
  }

  async updateSelect(coord) {
    // The coord1 variable is not actually used, but acts
    // as a placeholder so that we can await the result of
    // our asynchronous action call and update the board

    let coord1; // eslint-disable-line
    const board = this.props.currentBoard;

    if (!board.origin) {
      coord1 = await this.props.setOrigin(coord);
    } else if (!board.dest) {
      coord1 = await this.props.setDestination(coord);
    }

    const origin = this.props.currentBoard.origin;
    const dest = this.props.currentBoard.dest;

    // If we have origin and destination, check if the move is legal
    if (origin && dest) {
      const move = this.state.engine.move({ from: origin, to: dest });

      // If a move was made, reset the selections
      if (move) {
        this.props.clearCoords();
        this.props.setBoard(this.getBoard());
        console.log('This is the pgn');
        console.log(this.state.engine.pgn());
      } else {
        console.log('Illegal move my guy');
        this.props.clearCoords();
      }
    }

    const pgn = this.props.currentBoard.pgn;
    if (pgn) {
      // const options = { sloppy: true };
      // console.log(this.state.engine.load_pgn(pgn, options));
      // console.log(this.state.engine.pgn());
    }
  }

  renderSquares() {
    const updatedTiles = this.props.currentBoard.board;
    const listItems = updatedTiles.map(tile => <Tile
      color={tile.color} piece={tile.piece}
      coordinate={tile.coordinate} onclick={this.onClick}
    />);

    return listItems;
  }

  renderSquares1() {
    return this.props.currentBoard.board.map(tile => <Tile
      color={tile.color} piece={tile.piece}
      coordinate={tile.coordinate} onclick={this.onClick}
    />);
  }

  render() {
    // Push tiles from state into array of dom elements to display
    const updatedTiles = this.props.currentBoard.board;
    const listItems = updatedTiles.map(tile => <Tile
      color={tile.color} piece={tile.piece}
      coordinate={tile.coordinate} onclick={this.onClick}
    />);

    // console.log('These are tiles');
    // console.log(updatedTiles);
    return (
      <div className="chessBoard" >
        {listItems}
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
)(Chessboard);
