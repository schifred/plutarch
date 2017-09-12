"use strict";

import React, { Component } from "react";
import { connect } from "dva";

const IndexPage = function({locale,language}){
  const { BannerConfig, IndexFormConfig, SecondaryScreenConfig } = locale;
  const { imgUrls, logoUrl, mainTitle, subTitle } = BannerConfig;
  const { model: { email, investment }, button } = IndexFormConfig;
  const { mainImgUrl } = SecondaryScreenConfig;
  return (
    <div className="page-container">
      <div className="banner" style={{backgroundImage:`url(${imgUrls[0]})`}}>
        <div className="content-container">
          <div className="circus-arrow left-circus-arrow"/>
          <div className="banner-titles">
            <div className="banner-logo" style={{backgroundImage:`url(${logoUrl})`}}/>
            <div className="main-title">
              {
                mainTitle.split(/\n/).map((item,idx)=>{
                  const title = item.trim(); 
                  return <div key={idx}>{title}</div>
                })
              }
            </div>
            <div className="sub-title">
              {
                subTitle.split(/\n/).map((item,idx)=>{
                  const title = item.trim(); 
                  return <div key={idx}>{title}</div>
                })
              }
            </div>
          </div>
          <div className="circus-arrow right-circus-arrow"/>
        </div>
      </div>

      <div className="index-form">
        <div className="content-container form-content">
          <input className="eigen-input-field email" placeholder={email.placeholder}/>
          <div className="eigen-select-field-wrap investment">
            <select className="eigen-select-field" placeholder={investment.placeholder}>
              <option>{investment.placeholder}</option>
            </select>
            <b/>
          </div>
          <button className="start-button">{button.title}</button>
        </div>
      </div>

      <section className="index-section content-container">
        <div className="title-content">
          <div className="icon" style={{backgroundImage:`url(${mainImgUrl})`}}/>
          <div className="main-title">{SecondaryScreenConfig.mainTitle}</div>
          <div className="sub-title">
            {
              SecondaryScreenConfig.subTitle.split(/\n/).map((item,idx)=>{
                const title = item.trim(); 
                return <div key={idx}>{title}</div>
              })
            }
          </div>
        </div>
        <div className="section-columns">
          {
            SecondaryScreenConfig.columns.map((item,index)=>{
              return (
                <div className="section-column" key={index}>
                  <div className="icon" style={{backgroundImage:`url(${item.icon})`}}/>
                  <div className="main-title">{item.mainTitle}</div>
                  <div className="sub-title">
                    {
                      item.subTitle.split(/\n/).map((item,idx)=>{
                        const title = item.trim(); 
                        return <div key={idx}>{title}</div>
                      })
                    }
                  </div>
                </div>
              )
            })
          }
        </div>
      </section>
    </div>
  );
};

function mapStateToProps({app}){
  const { language, locale } = app;
  return { language, locale };
}

export default connect(mapStateToProps)(IndexPage);
