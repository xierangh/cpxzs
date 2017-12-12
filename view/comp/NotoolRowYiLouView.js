/**
 * 做号工具-遗漏
 */


'use strict';
import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight,
    Dimensions,
    PixelRatio
} from 'react-native';

import _ from 'lodash'
import Utils from './../Utils'

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

  componentWillReceiveProps(nextProps) {
    // console.log("checkbox接收到新参数啦 ");
    // console.log(nextProps);
    this.setState({
      number: nextProps.number,
      isSelected:nextProps.isSelected,
    });
  }

  constructor(props) {
    super(props)
    this.state={
      number:this.props.number,
      isSelected:this.props.isSelected,
    }
  }

  render(){
    return (
        <View style={mystyle.circle}>
          <Text style={this.state.isSelected?mystyle.circle_c_number_selected:mystyle.c_number}>{this.state.number}</Text>
        </View>
    )
  }
}

export default class NotoolRowYiLouView extends React.Component{

  static propsTypes={
    selected:React.PropTypes.array,
  }

  // static defaultProps={
  //   selected:[],//默认不选
  // }

  constructor(props){
    super(props)
    // this.state={
    //   selected:this.props.selected,
    // }
  }

  componentWillReceiveProps(nextProps) {
    // console.log("checkbox接收到新参数啦 ");
    // console.log('componentWillReceiveProps...');
    // this.setState({
    //   selected: nextProps.selected
    // });
  }


  render(){

    var rows = [];
    var max = -1;
    for(var i in this.props.selected){
        if(this.props.selected[i] > max){
            max = this.props.selected[i];
        }
    }
    for (var i in this.props.selected) {
        var isselected = false;
        if (this.props.selected[i] == max){
            isselected = true;
            // console.log(`max = ${max},index=${i},value=${this.props.selected[i]}`);
        }
      rows.push(
        <NumberCircle
          key={i}
          number={this.props.selected[i]}
          isSelected={isselected}
        />
      );
    }
    return (
      <View style={{flex:1,flexDirection:'row'}}>
        {rows}
      </View>
    )
  }
}

var circle_size=26*Utils.scale;
var marg = Utils.getNotoolMargin();
const mystyle=StyleSheet.create({
	circle:{
		width:circle_size,
		height:circle_size,
		borderRadius:circle_size/2,
		backgroundColor:'#e0e0e000',
		alignItems:'center',
		justifyContent:'center',
		marginHorizontal:marg,
	},
	c_number:{
		fontSize:Utils.FONT_SMALL,
		color:'#333',
		textAlign:'center',
	},
    circle_c_number_selected:{
        fontSize:Utils.FONT_SMALL,
        color:'#ea5656',
        textAlign:'center',
    },
  circle_selected:{
		width:circle_size,
		height:circle_size,
		borderRadius:circle_size/2,
		backgroundColor:'#e00',
		alignItems:'center',
		justifyContent:'center',
		margin:marg,
	},
	c_number_selected:{
		fontSize:14*Utils.scale,
		color:'#fff',
		textAlign:'center',
	},
});
