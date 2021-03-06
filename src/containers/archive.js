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
      name: 'kingraoul',
    };

    this.renderArchive = this.renderArchive.bind(this);
    this.players = this.players.bind(this);
  }

  players(game) {
    console.log('This is i the game');
    console.log(game);
    console.log(game.players.black.username);
    console.log(game.players.white.username);
    if (game.players.white.username === this.state.name) {
      console.log('youre white');
      return (
        <div>
          <div>
            {game.players.white.username}
          </div>
          <div>
            {game.players.black.username}
          </div>
        </div>);
    } else {
      return (
        <div>
          <div>
            {game.players.black.username}
          </div>
          <div>
            {game.players.white.username}
          </div>
        </div>);
    }
  }

  renderArchive() {
    if (this.props.archive.games) {
      const archivedGames = this.props.archive.games.map(game =>
        <div className="archivedGameContainer">
          {game.opening}
          {this.players(game)}
        </div>,
      );
      return (
        <div>
          { archivedGames }
        </div>
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
