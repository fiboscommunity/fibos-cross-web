import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as MemoryRouter, Route, Switch } from 'react-router-dom'
import Loadable from 'react-loadable'

import { Provider } from 'react-redux'
import store from './store'

import * as serviceWorker from './serviceWorker'

import { Home } from 'Pages'
import 'nprogress/nprogress.css'

class AppGetter extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <MemoryRouter>
          <Switch>
            <Route path="/" component={Home} />
          </Switch>
        </MemoryRouter>
      </Provider>
    )
  }
}

Loadable.preloadReady().then(() => {
  ReactDOM.render(<AppGetter />, document.getElementById('app'))

  serviceWorker.unregister()
})
