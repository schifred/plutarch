import React from "react";
import { connect } from "dva";

const Container = function({children}){
  return <div className="antd-mobile-container">
    { children }
  </div>
};

function mapStateToProps({app}){
  return app;
}

export default connect(mapStateToProps)(Container);