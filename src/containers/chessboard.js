import React, { Component } from 'react';
import Tile from './tile';


function fillBoard(tiles) {
  let swap = true;
  for (let i = 0; i < 64; i += 1) {
    if (i % 8 === 0) { swap = !swap; }

    let c = '';

    if (swap) {
      c = (i % 2 === 0) ? 'black' : 'white';
    } else {
      c = (i % 2 === 1) ? 'black' : 'white';
    }
    tiles.push({ color: c });
  }

  return tiles;
}

class Chessboard extends Component {

  constructor(props) {
    super(props);

    const tiles = fillBoard([]);

    this.state = {
      tiles,
    };
  }

  render() {
    const listItems = this.state.tiles.map(d => <Tile color={d.color} />);
    return (
      <div className="chessBoard" >
        {listItems}
      </div>
    );
  }
}

export default Chessboard;
