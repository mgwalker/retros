import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import store from './store';

import CreateRetro from './presentation/create-retro';
import GetRetroProperties from './containers/get-retro-properties';
import EnableRetroHappiness from './containers/enable-retro-happiness';
import * as RunningRetro from './containers/running';

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={CreateRetro} />
      <Route path="/setup">
        <Route path="properties" component={GetRetroProperties} />
        <Route path="happiness" component={EnableRetroHappiness} />
      </Route>
      <Route path="/retro/lobby/:retroID" component={RunningRetro.Lobby} />
      <Route path="/retro/get-ready" component={RunningRetro.GetReady} />
      <Route path="/retro/" component={RunningRetro.Layout}>
        <Route path="polling" component={RunningRetro.Polling} />
        <Route path="voting" component={RunningRetro.Voting} />
        <Route path="happiness" component={RunningRetro.Happiness} />
      </Route>
      <Route path="/retro/results" component={RunningRetro.Results} />
    </Router>
  </Provider>,
  document.getElementById('content')
);
