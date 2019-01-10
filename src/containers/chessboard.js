import React, { Component } from 'react';
import Chess from 'chess.js';

import Tile from './tile';

import { intToCoord, coordToInt, fillBoard, getSource } from '../helper_functions';

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
    getSource();

    console.log(intToCoord(23));
    console.log(coordToInt('h3'));
  }

  onClick(tile) {
    this.setState({ clicked: tile });
    console.log(tile);
  }

  getBoard() {
    const board = [];

    for (let i = 0; i < 64; i += 1) {
      const coord = intToCoord(i);
      const tile = this.state.engine.get(coord);

      board[i] = this.state.tiles[i];

      if (tile) { board[i].piece = tile; }
    }

    return board;
  }

  updateSelect(coord) {
    if (!this.state.origin) {
      this.setState({ origin: coord });
    }

    if (!this.state.destination) {
      this.setState({ destination: coord });
    }
  }

  resetSelect() {
    this.setState({ origin: null, destination: null });
  }

  render() {
    // Push tiles from state into array of dom elements to display
    const updatedTiles = this.getBoard();
    const listItems = updatedTiles.map(d => <Tile
      color={d.color} piece={d.piece}
      coordinate={d.coordinate} onclick={this.onClick}
    />);

    return (
      <div className="chessBoard" >
        {listItems}
      </div>
    );
  }
}

export default Chessboard;
