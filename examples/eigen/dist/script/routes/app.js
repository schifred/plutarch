"use strict";

import "css/common.less";
import "css/index.less";
import React, { Component } from "react";
import { connect } from "dva";
import Header from "script/components/Header";

const Container = function({language,locale,children}){
  return <div className="eigen-container">
    <Header locale={locale} language={language}/>
    { children }
  </div>
};

function mapStateToProps({app}){
  const { language, locale } = app;
  return { language, locale };
}

export default connect(mapStateToProps)(Container);
