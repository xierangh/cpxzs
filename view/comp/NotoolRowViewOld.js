//做号工具中一行数字

'use strict';
import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight
} from 'react-native';

import _ from 'lodash'

class NumberCircle extends React.Component{
  static propTypes={
    number:React.PropTypes.number,
    isSelected:React.PropTypes.bool,
    onPress:React.PropTypes.func,
  }

  static defaultProps = {
    number:0,
    isSelected:false,
  }

  constructor(props) {
    super(props)
    this.state={
      number:this.props.number,
      isSelected:this.props.isSelected,
    }
  }

  setIsSelected(selected:bool){
    this.setState({
      isSelected:selected,
    })
  }

  getSelected(){
    return this.state.isSelected;
  }

  onClick(){
    this.setState({
      isSelected:!this.state.isSelected,
    })
    this.props.onPress && this.props.onPress(this.state.number,!this.state.isSelected)
  }

  render(){
    return (
      <TouchableHighlight
        underlayColor={'#fff2'}
        onPress={()=>this.onClick()}>
        <View style={this.state.isSelected?mystyle.circle_selected:mystyle.circle}>
          <Text style={this.state.isSelected?mystyle.circle_c_number_selected:mystyle.c_number}>{this.state.number}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}

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
      }

    }

    return (
      <View>
        <View style={{flex:1,flexDirection:'row'}}>
          {cols}
        </View>
        <View style={{flex:1,flexDirection:'row'}}>
          {cols2}
        </View>
        <View style={{flex:1,flexDirection:'row'}}>
          {cols3}
        </View>
      </View>
    )
  }
}

var circle_size=24;
const mystyle=StyleSheet.create({
	circle:{
		width:circle_size,
		height:circle_size,
		borderRadius:circle_size/2,
		backgroundColor:'#e0e0e0',
		alignItems:'center',
		justifyContent:'center',
		margin:3,
	},
	c_number:{
		fontSize:14,
		color:'#fff',
		textAlign:'center',
	},
  circle_selected:{
		width:circle_size,
		height:circle_size,
		borderRadius:circle_size/2,
		backgroundColor:'#e00',
		alignItems:'center',
		justifyContent:'center',
		margin:3,
	},
	c_number_selected:{
		fontSize:14,
		color:'#fff',
		textAlign:'center',
	},
});
