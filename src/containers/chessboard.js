import React, { Component } from 'react';
import Chess from 'chess.js';

import Tile from './tile';

import { intToCoord, fillBoard, getSource } from '../helper_functions';

class Chessboard extends Component {

  constructor(props) {
    super(props);

    const tiles = fillBoard([]);

    this.state = {
      tiles,
      clicked: 'empty',
      engine: new Chess(),
      board: '',
    };

    this.setState({ board: this.getBoard() });

    this.onClick = this.onClick.bind(this);
    this.getBoard = this.getBoard.bind(this);
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
      board.push(tile);
    }

    console.log(board);

    return board;
  }

  render() {
    // Push tiles from state into array of dom elements to display
    const listItems = this.state.tiles.map(d => <Tile color={d.color} coordinate={d.coordinate} onclick={this.onClick} />);

    return (
      <div className="chessBoard" >
        {listItems}
      </div>
    );
  }
}

export default Chessboard;
