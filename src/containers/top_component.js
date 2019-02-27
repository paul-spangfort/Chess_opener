import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';

import {
  getArchive,
  fetchGames,
} from '../actions';

// const OFFLINE = true;
const OFFLINE = false;


class TopComponent extends Component {

  constructor(props) {
    super();
    this.state = {
      username: '',
    };

    this.onChange = this.onChange.bind(this);
    this.renderButtonText = this.renderButtonText.bind(this);
  }

  onChange(event) {
    this.setState({ username: event.target.value });
  }


  onClick() {
    this.props.fetchGames(this.state.username);
  }

  renderButtonText() {
    if (this.props.status.status === 'FINISHED') {
      return ('Fetch Games');
    } else {
      return ('Loading');
    }
  }

  render() {
    const val = this.state.username ? this.state.username : '';

    return (
      <div className="topComponentMain">

        <div className="connectionComponent">
          <div>
Username
        </div>

          <input className="topcInput" onChange={this.onChange} value={val} />

          <Button variant="outline-primary" size="sm" onClick={() => this.props.fetchGames(this.state.username)}>
            {this.renderButtonText()}
          </Button>

        </div>

        <div className="">
        sd
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => ({ // eslint-disable-line no-unused-vars
  archive: state.games,
  status: state.status,
});


export default connect(mapStateToProps,
  {
    getArchive,
    fetchGames,
  },
)(TopComponent);
