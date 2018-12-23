import React, { Component } from 'react';

class TopComponent extends Component {

  constructor(props) {
    super();
    this.props = {
      temp: '',
    };
  }

  render() {
    return (
      <div className="topComponentMain">

        <div className="connectionComponent">
          <div>
Username
        </div>

          <input className="topcInput" />

        </div>

        <div className="">
        sd
        </div>

      </div>
    );
  }
}

export default TopComponent;
