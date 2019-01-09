import React, { Component } from 'react';

class Tile extends Component {

  constructor(props) {
    super(props);

    const color = (props.color) ? props.color : 'black';
    const piece = (props.piece) ? props.piece : false;

    this.state = {
      color,
      piece,
    };

    if (typeof props.color === 'undefined') {
      this.setState({ color: 'black' });
    }

    this.renderPiece = this.renderPiece.bind(this);
  }

  renderPiece() {
    if (this.state.piece) {
      return (
        <div> hi </div>
      );
    } else {
      return (
        <div>
          <img src="https://commons.wikimedia.org/wiki/Category:SVG_chess_pieces#/media/File:Chess_kdt45.svg" alt="" />
        </div>
      );
    }
  }

  render() {
    const styles = {

      backgroundColor: this.state.color,
      // height: this.state.height,
      // width: this.state.width,
    };

    return (
      <div className="chessTile" style={styles} >
        {this.renderPiece()}
      </div>
    );
  }
}

export default Tile;
