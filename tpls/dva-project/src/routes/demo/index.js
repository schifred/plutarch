/* demo */
import React from 'react'
import { connect } from 'dva'
import { withRouter } from 'dva/router'

const Demo = ({ demo, dispatch }) => {

  return (
    <div>
      A application demo built upon Ant Design and Dva.js
    </div>
  )
}

export default withRouter(connect(({ demo }) => ({ demo }))(Demo))