"use strict";

import React, { Component } from "react";

const Header = function({locale,language}){
  const { Languages, TopMenus, SocialIcons } = locale;

  return (
    <div className="header-container">
      <div className="header">
        <span className="language-icons">
          {
            Languages.map((lang,idx)=>{
              let ele = lang.key==language ? <a className="active">{lang.title}</a> :
                <a>{lang.title}</a>;
              return idx!==Languages.length-1 ? <span key={lang.key}>{ele} / </span> : 
                <span key={lang.key}>{ele}</span>;
            })
          }
        </span>
        <span className="top-menu">
          {
            TopMenus.map(item=>{
              return <a key={item.key} className="menu-item">{item.title}</a>
            })
          }
        </span>
        <span className="social-icons">
          {
            SocialIcons.map(item=>{
              return <a key={item.key} className="social-icon" 
                style={{backgroundImage:`url(${item.link})`}}/>
            })
          }
        </span>
      </div>
    </div>
  );
};

export default Header;
