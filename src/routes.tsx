import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import { history } from './store/history';
import { EXAMPLE, HOME } from 'constants/url';
import PageNotFound from './pages/not-found';
import PageHome from './pages/home';
import PageExample from './pages/example';

export default () => (
  <Router history={history}>
    <Switch>
      <Route exact path={HOME} render={PageHome} />
      <Route exact path={EXAMPLE} render={PageExample} />
      <Route render={PageNotFound} />
    </Switch>
  </Router>
);
