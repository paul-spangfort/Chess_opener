import React, { Component } from 'react';
import Chess from 'chess.js';

import { connect } from 'react-redux';

import Tile from './tile';

import { intToCoord, coordToInt, fillBoard } from '../helper_functions';
import {
  setOrigin,
  setDestination,
  clearDest,
  clearOrigin,
  clearCoords,
  setBoard,
  fetchGames,
} from '../actions';

class Chessboard extends Component {

  constructor(props) {
    super(props);

    const tiles = fillBoard([]);

    this.state = {
      tiles,
      clicked: 'empty',
      engine: new Chess(),
      board: '',
      origin: null,
      dest: null,
    };

    this.setState({ board: this.getBoard() });
    this.onClick = this.onClick.bind(this);
    this.getBoard = this.getBoard.bind(this);
    this.getBoard1 = this.getBoard1.bind(this);
    this.updateSelect = this.updateSelect.bind(this);

    console.log('Constructor');
    console.log(this.state.tiles);

    console.log('hasdf');
    console.log(this.getBoard1());
  }

  componentWillMount() {
    this.props.setBoard(this.getBoard1());
    this.props.fetchGames('kingraoul');
  }

  onClick(tile) {
    this.updateSelect(tile);
    coordToInt('a3');
  }

  getBoard1() { // eslint-disable-line
    let tiles = []; // eslint-disable-line

    let swap = true;
    for (let i = 0; i < 64; i += 1) {
      const tile = {};

      const coord = intToCoord(i);
      const piece = this.state.engine.get(coord);

      if (i % 8 === 0) { swap = !swap; }


      let c = '';

      if (swap) {
        c = (i % 2 === 0) ? 'black' : 'white';
      } else {
        c = (i % 2 === 1) ? 'black' : 'white';
      }

      tile.color = c;
      tile.coordinate = coord;

      if (piece) {
        tile.piece = piece;
      }

      tiles.push(tile);
    }

    return tiles;
  }

  getBoard() {
    const board = [];

    for (let i = 0; i < 64; i += 1) {
      const coord = intToCoord(i);
      const tile = this.state.engine.get(coord);

      board[i] = this.state.tiles[i];

      if (tile) {
        board[i].piece = tile;
        board[i].origin = this.state.origin;
        board[i].dest = this.state.dest;
      }
    }

    return board;
  }

  async updateSelect(coord) {
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
        this.props.setBoard(this.getBoard1());
        console.log('This is the pgn');
        console.log(this.state.engine.pgn());
      } else {
        console.log('Illegal move my guy');
        this.props.clearCoords();
      }
    }

    console.log(this.props.currentBoard);
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

export default connect(mapStateToProps, { setOrigin, setDestination, clearDest, clearOrigin, clearCoords, setBoard, fetchGames })(Chessboard);
