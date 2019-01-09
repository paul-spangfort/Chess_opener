import React, { Component } from 'react';
import Chess from 'react-chess';
import Engine from 'chess.js';

import Tile from './tile';

import { fillBoard } from '../helper_functions';

class Chessboard extends Component {

  constructor(props) {
    super(props);

    const tiles = fillBoard([]);

    this.state = {
      tiles,
      clicked: 'empty',
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick(tile) {
    this.setState({ clicked: tile });
    console.log(tile);
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
