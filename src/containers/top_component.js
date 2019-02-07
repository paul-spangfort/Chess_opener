import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';

import {
  getArchive,
} from '../actions';


class TopComponent extends Component {

  constructor(props) {
    super();
    this.state = {
      username: '',
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.setState({ username: event.target.value });
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

          <Button onClick={() => this.props.getArchive(this.state.username)} />

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
});


export default connect(mapStateToProps,
  {
    getArchive,
  },
)(TopComponent);
