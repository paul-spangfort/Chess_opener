import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Main from './containers/chess_container';

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
fd
<Main />
        </div>

      </div>

    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('main'));
