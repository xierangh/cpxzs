//做号工具--字符串数组['大大','大小','小大','小小','单单','单双','双单','双双','质质','质合','合质','合合']

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

export default class NotoolRowText2View extends React.Component{

  propsTypes={
    selected:React.PropTypes.array,
    starNum:React.PropTypes.number,
    isS012:React.PropTypes.bool,
  }
  defaultProps={
    isS012:false,
  }
  constructor(props){
    super(props)
    var selected = [];//默认不选
    if(this.props.selected){
      selected = this.props.selected;
    }
    this.state={
      selected:selected,
      starNum:this.props.starNum,
      isS012:this.props.isS012,
    }
  }

  setStarNum(starNum:number){
    this.setState({
      starNum:starNum,
    })
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
    var cols4 = [];
    var values =[];
    var len = this.state.starNum;
    if (this.state.isS012) {
      values = gets012arr(len,['0','1','2']);
    }else{
      values = gets012arr(len,['大','小']).concat(gets012arr(len,['奇','偶']),gets012arr(len,['质','合']))
    }

    for (var i = 0; i < values.length; i++) {
      var item = values[i];
      var isSelected = _.includes(this.state.selected,item);
      var refstr = 'nc'+i;
      var nc = <NumberCircle
                  ref={refstr}
                  key={i}
                  isSelected={isSelected}
                  number={item}
                  onPress={(number,status)=>this.onPress(number,status)}
                />;
      if(i < 7){
        cols.push(
        nc
        );
      }else if(i >= 7 && i < 14){
        cols2.push(
          nc
        );
      }else if(i >= 14 && i < 21){
        cols3.push(
          nc
        );
      }else if(i >= 21 && i < 28){
        cols4.push(
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
        <View style={{flex:1,flexDirection:'row'}}>
          {cols4}
        </View>
      </View>
    )
  }
}

var width=45;
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

//获得杀012的号码
function gets012arr(len:number,barr:array){
  var retarr=[];
  if (len == 2) {
    for (var i = 0; i < barr.length; i++) {
      for (var k = 0; k < barr.length; k++) {
        retarr.push(barr[i]+barr[k]);
      }
    }
  }else if (len == 3) {
    for (var i = 0; i < barr.length; i++) {
      for (var j = 0; j < barr.length; j++) {
        for (var k = 0; k < barr.length; k++) {
          retarr.push(barr[i]+barr[j]+barr[k]);
        }
      }
    }
  }else if(len==4){
    for (var i = 0; i < barr.length; i++) {
      for (var j = 0; j < barr.length; j++) {
        for (var k = 0; k < barr.length; k++) {
          for (var l = 0; l < barr.length; l++) {
            retarr.push(barr[i]+barr[j]+barr[k]+barr[l]);
          }
        }
      }
    }
  }else{
    for (var i = 0; i < barr.length; i++) {
      for (var j = 0; j < barr.length; j++) {
        for (var k = 0; k < barr.length; k++) {
          for (var l = 0; l < barr.length; l++) {
            for (var m= 0; m < barr.length; m++) {
              retarr.push(barr[i]+barr[j]+barr[k]+barr[l]+barr[m]);
            }
          }
        }
      }
    }
  }
  return retarr;
}
