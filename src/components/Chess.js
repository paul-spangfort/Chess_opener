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


  render() {
    return (
      <div className="chessContainer" />
    );
  }
}
