import React, { Component } from 'react';

import { connect } from 'react-redux';

import {
  setOrigin,
  setDestination,
  clearDest,
  clearOrigin,
  clearCoords,
  setBoard,
  fetchGames,
  getArchive,
} from '../actions';

class Archives extends Component {

  constructor(props) {
    super(props);

    this.state = {
      games: '',
    };

    this.renderArchive = this.renderArchive.bind(this);
  }

  renderArchive() {
    if (this.props.archive.games) {
      const archivedGames = this.props.archive.games.map(game =>
        <div className="archivedGameContainer">
          {game.opening}
          {game.players}
        </div>,
      );
      return (
        { archivedGames }
      );
    } else {
      return (
        <div className="archivedGameContainer" >
          test
        </div>
      );
    }
  }

  render() {
    return (
      <div className="archives" >
        {this.renderArchive()}
      </div>
    );
  }
}

const mapStateToProps = state => ({ // eslint-disable-line no-unused-vars
  currentBoard: state.currentBoard,
  archive: state.archive,
});

export default connect(mapStateToProps,
  { setOrigin,
    setDestination,
    clearDest,
    clearOrigin,
    clearCoords,
    setBoard,
    fetchGames,
    getArchive,
  },
)(Archives);
