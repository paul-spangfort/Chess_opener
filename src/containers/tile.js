import React, { Component } from 'react';
import { getSource } from '../helper_functions';


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

    if (typeof props.color === 'undefined') {
      this.setState({ color: 'black' });
    }

    this.renderPiece = this.renderPiece.bind(this);
    this.coord = this.coord.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  coord() {
    console.log(this.state.coordinate);
  }

  handleClick() {
    this.props.onclick(this.state.coordinate);
    this.setState({ selected: true });
  }

  renderPiece() {
    if (this.state.piece) {
      const imgsrc = getSource(this.state.piece);
      return (
        <div>
          <img src={imgsrc} alt="" />
        </div>
      );
    } else {
      return (
        <div>
          {this.state.piece.type}
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

    if (this.state.selected) {
      styles.backgroundColor = 'black';
      console.log('hi');
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

export default Tile;
