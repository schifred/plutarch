/* demo */
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

const Demo = ({ demo, dispatch }) => {

  return (
    <div>
      A application demo built upon Ant Design and Redux.js
    </div>
  )
}

export default withRouter(connect(({ demo }) => ({ demo }))(Demo))