import React, { Component } from 'react';
import Chess from 'react-chess';
import Engine from 'chess.js';

// const lineup = ['R@h1', 'P@f2', 'q@d8', 'R@a1', 'P@a2', 'P@c2', 'b@c8', 'p@d7', 'Q@d1', 'n@g8'];

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      temp: 'das',
      engine: new Engine(),
      lineup: ['R@h1', 'P@f2', 'q@d8', 'R@a1', 'P@a2', 'P@c2', 'b@c8', 'p@d7', 'Q@d1', 'n@g8'],
    };

    console.log(this.state);
    console.log(this.state.engine.pgn());
    this.state.engine.move({ from: 'e2', to: 'e4' });
    console.log(this.state.engine.pgn());

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

export default Main;
