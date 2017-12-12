/**
 * 做号工具中一行数字
 */

import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight,
    Image,
} from 'react-native';

import _ from 'lodash'
import NumberCircle from './NumberCircle'


export default class NotoolRowView extends React.Component{

  propsTypes={
    selected:React.PropTypes.array,
    maxNum:React.PropTypes.number,
  }
  //所有实例都用同一个
  static defaultProps={
    maxNum:9,
  }

  constructor(props){
    super(props)
    var selected = [];//默认不选
    if(this.props.selected){
      selected = this.props.selected;
    }
    this.state={
      selected:selected,
      maxNum:this.props.maxNum+1,
    }
  }

  getSelected(){
    return this.state.selected;
  }

  getUnSelected(){
    var unselected=[];
    for (var ref in this.refs) {
      // console.log(this.refs[ref].props.number);
      var selected = this.refs[ref].getSelected();
      if(!selected){
        unselected.push(this.refs[ref].props.number);
      }
    }
    return unselected;
  }

  setMaxNum(max:number){
    this.setState({
      maxNum:max+1
    })
  }

  setSelected(nselected:array){
    this.setState({
      selected:nselected,
    })
    // for (var i = 0; i < this.state.maxNum; i++) {
    //   var selected = _.includes(nselected,i);
    //   this.refs.nselected[i].setSelected(selected);
    // }
    for (var ref in this.refs) {
      // console.log(this.refs[ref].props.number);
      var selected = _.includes(nselected,this.refs[ref].props.number);
      this.refs[ref].setIsSelected(selected);
    }
  }

  //当号码被点击后修改当前选中的数字
  onPress(number,status){
    var tmp = this.state.selected;
    if(status){
      tmp.push(number);
    }else {
      _.remove(tmp,function(n){ return n==number});
    }

    this.setState({
      selected:tmp,
    })
    console.log(this.state.selected);
  }

  render(){
    var cols = [];
    var cols2 = [];
    var cols3 = [];
    var cols4 = [];
    var cols5 = [];
    for (var i = 0; i < this.state.maxNum; i++) {
      var isSelected = _.includes(this.state.selected,i);
      var refstr = 'nc'+i;
      var nc = <NumberCircle
                ref={refstr}
                key={i}
                isSelected={isSelected}
                number={i}
                onPress={(number,status)=>this.onPress(number,status)}
              />;

      if(i < 10){
        cols.push(
          nc
        );
      }else if(i >= 10 && i < 20){
        cols2.push(
          nc
        );
      }else if(i >= 20 && i < 30){
        cols3.push(
          nc
        );
      }else if(i >= 30 && i < 40){
          cols4.push(
              nc
          );
      }else if(i >= 40 && i < 50){
          cols5.push(
              nc
          );
      }

    }

    return (
      <View style={{flex:1}}>
        <View style={{flex:1,flexDirection:'row'}}>
          {cols}
        </View>
        <View style={{flex:1,flexDirection:'row'}}>
          {cols2}
        </View>
        <View style={{flex:1,flexDirection:'row'}}>
          {cols3}
        </View>
        <View style={{flex:1,flexDirection:'row'}}>
            {cols4}
        </View>
        <View style={{flex:1,flexDirection:'row'}}>
            {cols5}
        </View>
      </View>
    )
  }
}

