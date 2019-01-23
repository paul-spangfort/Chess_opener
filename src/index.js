import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
// import Main from './containers/chess_container';
import Chessboard from './containers/chessboard';


import TopComponent from './containers/top_component';
import './style.scss';

const store = createStore(reducers, {}, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f,
));

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

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('main'));
