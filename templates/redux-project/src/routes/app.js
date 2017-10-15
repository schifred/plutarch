/* eslint-disable no-undef */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'

class App extends Component {
  static propTypes = {
    // Injected by React Router
    children: PropTypes.node
  }

  render() {
    const { children } = this.props
    return (
      <div>
        <Helmet>
          <title>REDUX DEMO</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Helmet>
        <div>
          {children}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  inputValue: ownProps.location.pathname.substring(1)
})

export default withRouter(connect(mapStateToProps)(App))
