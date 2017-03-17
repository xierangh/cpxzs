
//CheckBox 单选 行

'use strict';

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from "react-native"

import CheckBox from './CheckBox';

export default class CheckBoxsView extends React.Component{

  static propTypes ={
    items:React.PropTypes.array,
    rowstyle:React.PropTypes.object,
  }

  constructor(props){
    super(props)
    var selected=[];
    for (var i = 0; i < this.props.items.length; i++) {
      selected[i] = (i==0);
    }
    this.state={
      selected:selected,
    }
  }

  getSelectedIndex(){
    var selected = this.state.selected;
    for (var i = 0; i < selected.length; i++) {
      if (selected[i]) {
        return i;
      }
    }
    return 0;
  }

  checkSelect(checked,name){
    // console.log(checked+','+name);
    var selected = this.state.selected;
    for (var i = 0; i < this.props.items.length; i++) {
      if (name == this.props.items[i]) {
        if (checked) {
          selected[i] = checked;
        }
      }else {
        selected[i] = false;
      }
    }
    this.setState({
      selected:selected
    })
  }

  render(){
    var rows = [];
    for (var i = 0; i < this.props.items.length; i++) {
      var labelname = this.props.items[i];
      var refstr = 'nc'+i;
      rows.push(
        <CheckBox
             key={i}
             ref={refstr}
             label={labelname}
             checked={this.state.selected[i]}
             labelStyle={{marginLeft:5}}
             boxStyle={{width:60}}
             onChange={(checked,name) => this.checkSelect(checked,name)} />
      );
    }

    return (
      <View style={[this.props.rowstyle,{flexDirection:'row'}]}>
          {rows}
      </View>
    );
  }

}
