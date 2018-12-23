import React, { Component } from 'react';


class Tile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      color: props.color,
      piece: props.piece,
      height: props.height,
      width: props.width,
    };

    if (typeof props.color === 'undefined') {
      this.setState({ color: 'black' });
    }
  }

  render() {
    const styles = {

      color: this.state.color,
      // height: this.state.height,
      // width: this.state.width,
    };

    return (
      <div className="chessTile" style={styles}> sadf </div>
    );
  }
}

export default Tile;
