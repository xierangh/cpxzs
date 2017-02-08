//做号工具--字符串数组[00,01,02,10,11,12,20,21,22]

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
    number:React.PropTypes.string,
    isSelected:React.PropTypes.bool,
    onPress:React.PropTypes.func,
  }

  static defaultProps = {
    number:'00',
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

export default class NotoolRowTextView extends React.Component{

  propsTypes={
    selected:React.PropTypes.array,
    items:React.PropTypes.array,
  }

  constructor(props){
    super(props)
    var selected = [];//默认不选
    if(this.props.selected){
      selected = this.props.selected;
    }
    this.state={
      selected:selected,
      items:this.props.items,
    }
  }

  getSelected(){
    return this.state.selected;
  }

  setSelected(nselected){
    this.setState({
      selected:nselected,
    })

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
    for (var i = 0; i < this.state.items.length; i++) {
      var item = this.state.items[i];
      var isSelected = _.includes(this.state.selected,item);
      var refstr = 'nc'+i;
      var nc = <NumberCircle
                  ref={refstr}
                  key={i}
                  isSelected={isSelected}
                  number={item}
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

var width=30;
var height=28;
const mystyle=StyleSheet.create({
	circle:{
		width:width,
		height:height,
		borderRadius:2,
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
		width:width,
		height:height,
		borderRadius:2,
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
