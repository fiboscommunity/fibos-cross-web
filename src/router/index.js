import React, { Component } from 'react'
// eslint-disable-next-line
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { LoadableComponent } from 'Commons'

class HomeRouter extends Component {
  render() {
    return (
      <Switch>
        <Route
          path="/"
          exact
          component={LoadableComponent(() => import('Pages/MainPage'), {}, {})}
        />
        <Route
          path="/index"
          exact
          component={LoadableComponent(() => import('Pages/MainPage'), {}, {})}
        />
        <Route
          path="/transfer"
          exact
          component={LoadableComponent(() => import('Pages/Transfer'), {}, {})}
        />
        <Route
          path="/help"
          exact
          component={LoadableComponent(() => import('Pages/Waiting'), {}, {})}
        />

        <Route back component={LoadableComponent(() => import('Pages/NoMatch'), {}, {})} />
      </Switch>
    )
  }
}

export default HomeRouter
