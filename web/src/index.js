import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Router, Route, hashHistory } from 'react-router';

require('uswds');

import reducers from './reducers';

import CreateRetro from './presentation/create-retro';
import GetRetroProperties from './containers/get-retro-properties';
import GetRetroHappiness from './presentation/get-retro-happiness';

const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={CreateRetro} />
      <Route path="/set-retro-properties" component={GetRetroProperties} />
      <Route path="/enable-retro-happiness" component={GetRetroHappiness} />
    </Router>
  </Provider>,
  document.getElementById('content')
);
