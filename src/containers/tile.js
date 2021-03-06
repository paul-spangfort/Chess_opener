import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSource, coordToInt } from '../helper_functions';

// const OFFLINE = true;
const OFFLINE = false;

class Tile extends Component {

  constructor(props) {
    super(props);

    const color = (props.color === 'black') ? '#B87030' : '#E0C068';
    const piece = (props.piece) ? props.piece : false;
    const coordinate = (props.coordinate) ? props.coordinate : 'empty';

    this.state = {
      color,
      piece,
      coordinate,
      selected: false,
    };

    this.renderPiece = this.renderPiece.bind(this);
    this.renderCoord = this.renderCoord.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getColor = this.getColor.bind(this);
  }

  getColor() {
    const n = coordToInt(this.state.coordinate);

    const row = Math.floor(n / 8);

    if (row % 2 === 0) {
      if (n % 2 === 0) {
        return '#B87030';
      } else {
        return '#E0C068';
      }
    } else if (n % 2 === 1) {
      return '#B87030';
    } else {
      return '#E0C068';
    }
  }

  handleClick() {
    this.props.onclick(this.state.coordinate);
    this.setState({ selected: true });
  }


  renderPiece() {
    const index = coordToInt(this.state.coordinate);

    const tile = this.props.currentBoard.board[index];

    // const style = { color: 'black' };

    if ((tile.piece) && (OFFLINE === false)) {
      const imgsrc = getSource(tile.piece);
      return (
        <div className="tileContainer">
          <img src={imgsrc} alt="" />
        </div>
      );
    } else if (tile.piece) {
      return (
        <div className="tileContainer">
          {tile.piece.color + tile.piece.type}
        </div>
      );
    } else {
      return (
        <div className="tileContainer" />
      );
    }
  }

  renderCoord() {
    if (this.state.coordinate[0] === 'a') {
      const style = {
        rightt: '20px',
        position: 'absolute',
      };
      return (
        <div style={style}>
          {this.state.coordinate[1]}
        </div>
      );
    } else if (this.state.coordinate[1] === '8') {
      const style = {
        top: '20px',
        position: 'absolute',
      };
      return (
        <div style={style}>
          {this.state.coordinate[0]}
        </div>
      );
    }

    return '';
  }

  render() {
    const styles = {

      backgroundColor: this.getColor(),
      color: 'white',
      // height: this.state.height,
      // width: this.state.width,
    };

    if (this.props.currentBoard.dest === this.state.coordinate || this.props.currentBoard.origin === this.state.coordinate) {
      styles.backgroundColor = 'red';
    }

    return (
      <div className="chessTile" style={styles} onClick={() => this.handleClick()}>
        {this.renderPiece()}
        {this.state.coordinate}
      </div>
    );
  }
}

const mapStateToProps = state => ({ // eslint-disable-line no-unused-vars
  currentBoard: state.currentBoard,
});

export default connect(mapStateToProps, {})(Tile);
