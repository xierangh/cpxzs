//做号工具--字符串数组['大大','大小','小大','小小','单单','单双','双单','双双','质质','质合','合质','合合']

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
          <Text style={this.state.isSelected?mystyle.c_number_selected:mystyle.c_number}>{this.state.number}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}

export default class NotoolRowText2ViewOld extends React.Component{

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
    var cols4 = [];
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

var width_L=45;
var height_L=24;
var borderRadius=4;

var {height, width} = Dimensions.get('window');
var marg = 3;
if (height <= 568) {
    width_L=40;
    marg=2;
}else if(height <= 667){
  width_L=44;
}else {
  width_L=50;
}
var pxielRatio = PixelRatio.get();
console.log('*************old:height='+height+',width='+width+',pxielRatio='+pxielRatio);
const mystyle=StyleSheet.create({
	circle:{
		width:width_L,
		height:height_L,
		borderRadius:borderRadius,
		backgroundColor:'#e0e0e0',
		alignItems:'center',
		justifyContent:'center',
		margin:marg,
	},
	c_number:{
		fontSize:12,
		color:'#333',
		textAlign:'center',
	},
  circle_selected:{
		width:width_L,
		height:height_L,
		borderRadius:borderRadius,
		backgroundColor:'#ea5656',
		alignItems:'center',
		justifyContent:'center',
		margin:marg,
	},
	c_number_selected:{
		fontSize:12,
		color:'#fff',
		textAlign:'center',
	},
});
