import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import DevTools from './DevTools'
import { Route, Redirect } from 'react-router-dom'
import App from './app'
import Demo from './demo'

const Root = ({ store }) => (
  <Provider store={store}>
    <App>
      <Route path="/" render={() => (<Redirect to="/demo" />)} />
      <Route path="/demo" component={Demo} />
      <DevTools />
    </App>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
}

export default Root
