import React, { Component } from "react";
import { observer } from "mobx-react";
import $i18n from "utils/$i18n";

@observer
export default class DetailUnits extends Component {

  render(){
    const { attributeTexts } = this.props;

    return (
      <span>
        {
          attributeTexts.map(({name, value}, index) => {
            return <div key={index}>{`${name}: ${value.join(',')}`}</div>
          })
        }
      </span>
    );
  }
};