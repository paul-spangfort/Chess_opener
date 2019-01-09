import React, { Component } from 'react';

class Tile extends Component {

  constructor(props) {
    super(props);

    const color = (props.color) ? props.color : 'black';
    const piece = (props.piece) ? props.piece : false;
    const coordinate = (props.coordinate) ? props.coordinate : 'empty';

    this.state = {
      color,
      piece,
      coordinate,
    };

    if (typeof props.color === 'undefined') {
      this.setState({ color: 'black' });
    }

    this.renderPiece = this.renderPiece.bind(this);
    this.coord = this.coord.bind(this);
  }

  coord() {
    console.log(this.state.coordinate);
  }

  renderPiece() {
    if (this.state.piece) {
      return (
        <div> hi </div>
      );
    } else {
      return (
        <div>
          <img src="https://img.icons8.com/ios/50/000000/pawn-filled.png" alt="" />
        </div>
      );
    }
  }

  render() {
    const styles = {

      backgroundColor: this.state.color,
      color: (this.state.color === 'white') ? 'black' : 'white',
      // height: this.state.height,
      // width: this.state.width,
    };

    return (
      <div className="chessTile" style={styles} onClick={() => this.props.onclick(this.state.coordinate)}>
        {this.renderPiece()}
        {this.state.coordinate}
      </div>
    );
  }
}

export default Tile;
