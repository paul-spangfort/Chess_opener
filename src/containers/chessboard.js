import React, { Component } from 'react';
import Chess from 'chess.js';

import { connect } from 'react-redux';

import Tile from './tile';

import { intToCoord, coordToInt, fillBoard, getSource } from '../helper_functions';
import { setOrigin } from '../actions';

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
    this.updateSelect = this.updateSelect.bind(this);
    this.resetSelect = this.resetSelect.bind(this);

    getSource();
  }

  onClick(tile) {
    this.updateSelect(tile);
    coordToInt('a3');
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

  updateSelect(coord) {
    if (!this.state.origin) {
      this.setState({ origin: coord });
    } else if (!this.state.destination) {
      this.setState({ dest: coord });
    }
    setTimeout(() => {
      console.log(this.state.origin);
      console.log(this.state.dest);
    }, 100);
  }

  resetSelect() {
    this.setState({ origin: null, destination: null });
  }

  render() {
    // Push tiles from state into array of dom elements to display
    const updatedTiles = this.getBoard();
    const listItems = updatedTiles.map(tile => <Tile
      color={tile.color} piece={tile.piece}
      coordinate={tile.coordinate} onclick={this.onClick}
      origin={tile.origin} dest={tile.dest}
    />);

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
  {
    setOrigin,
  },
)(Chessboard);
