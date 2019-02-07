import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSource, coordToInt } from '../helper_functions';

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

    if (tile.piece) {
      const imgsrc = getSource(tile.piece);
      return (
        <div>
          <img src={imgsrc} alt="" />
        </div>
      );
    } else {
      return (
        <div />
      );
    }
  }

  render() {
    const styles = {

      backgroundColor: this.getColor(),
      color: 'black',
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
