import React, { Component } from 'react';


class Chessboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      temp: 'das',
      tiles: [],
    };
    this.logMove = this.logMove.bind(this);
  }

  logMove(dp, from, to) {
    console.log(`Moving from ${from}`);
    console.log(`Move to ${to}`);

    if (this.state.engine.move({ from, to })) {
      console.log('Legal move');
      return true;
    } else {
      console.log('Illegal');
      return false;
    }
  }

  render() {
    return (
      <div className="chessContainer" >
        <Chess onMovePiece={this.logMove} />
      </div>
    );
  }
}
