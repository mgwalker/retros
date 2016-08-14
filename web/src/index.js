import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import store from './store';

require('clipboard');

import CreateRetro from './presentation/create-retro';
import GetRetroProperties from './containers/get-retro-properties';
import EnableRetroHappiness from './containers/enable-retro-happiness';
import DoRetro from './containers/do-retro';
import RunRetro from './containers/running-retro';
import GetHappiness from './containers/happiness-meter';
import RetroResults from './containers/retro-results';

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={CreateRetro} />
      <Route path="/set-retro-properties" component={GetRetroProperties} />
      <Route path="/enable-retro-happiness" component={EnableRetroHappiness} />
      <Route path="/retro" component={DoRetro} />
      <Route path="/retro-running" component={RunRetro} />
      <Route path="/retro-happiness" component={GetHappiness} />
      <Route path="/retro-results" component={RetroResults} />
    </Router>
  </Provider>,
  document.getElementById('content')
);
