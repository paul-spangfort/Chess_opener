import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
// import Main from './containers/chess_container';
import Chessboard from './containers/chessboard';

import { createStore, applyMiddleware, compose } from 'redux';

import TopComponent from './containers/top_component';
import './style.scss';

const App = (props) => {
  return (
    <Router>
      <div className="mainBackground">

        <div className="mainContainerTop">

          <TopComponent />

        </div>

        <div className="mainContainerBot">
          <Chessboard />
        </div>

      </div>

    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('main'));
