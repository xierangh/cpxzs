'use strict';
import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    TouchableHighlight,
    StyleSheet
} from 'react-native';

import Utils from './../Utils'
class PlanView extends React.Component{
  static propTypes={
    value:React.PropTypes.object,
    isSelected:React.PropTypes.bool,
    onPress:React.PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state={
      value:this.props.value,
      isSelected:this.props.isSelected,
    }
  }

  setIsSelected(isSelected){
    this.setState({
      isSelected:isSelected
    })
  }

  onClick(){
    this.setState({
      isSelected:true,
    })
    this.props.onPress && this.props.onPress(this.state.value)
  }

  render(){
    return (
      <TouchableHighlight
        underlayColor={'#fff2'}
        onPress={()=>this.onClick()}>
        <View style={[mystyle.col,this.state.isSelected&&mystyle.col_selected]}>
          <Text style={[mystyle.name,this.state.isSelected&&mystyle.name_selected]}>{this.state.value.showStr}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}

export default class NotoolTitleView extends React.Component{

  static propTypes={
    selected:React.PropTypes.object,
    items:React.PropTypes.array,
    onSelected:React.PropTypes.func,
  }
  static defaultProps={
    selected:{},
  }
  constructor(props) {
    super(props)
    this.state={
      selected:this.props.selected,
      items:this.props.items,
    }
    console.log('PlanSelectView create');
  }

  getSelected(){
    return this.state.selected;
  }

  //当计划被选中时要去掉其他选中项
  onPress(value){
    var oldValue = this.state.selected;
    this.setState({
      selected:value,
    })

    if (value.zhgjType !== oldValue.zhgjType) {
      //取消以前的选中项
      for (var ref in this.refs) {
        if(oldValue.zhgjType == this.refs[ref].props.value.zhgjType){
          this.refs[ref].setIsSelected(false);
          break;
        }
      }
    }

    this.props.onSelected && this.props.onSelected(value)
    console.log(this.state.selected);
  }

  render(){
    var cols = [];

    for (var i = 0; i < this.state.items.length; i++) {
      var item = this.state.items[i];
      var isSelected = (item.zhgjType == this.state.selected.zhgjType);
      var refstr = 'nc'+i;
      var nc = <PlanView
                  ref={refstr}
                  key={i}
                  isSelected={isSelected}
                  value={item}
                  onPress={(value)=>this.onPress(value)}
                />;
        cols.push(
          nc
        );
    }

    return (
      <View style={mystyle.row}>
          {cols}
      </View>
    )
  }
}


const mystyle=StyleSheet.create({
    row:{
      marginTop:25,
      flexDirection:'row',
      justifyContent:'space-around',
      borderRadius:3,
      marginBottom:10,
      paddingLeft:3,
      paddingRight:3,
      paddingVertical:1,
      alignItems:'center',
      height:32,
      backgroundColor:'rgb(186,26,33)'
    },
    col:{
      width:70*Utils.scale,
      height:30,
      borderRadius:2,
      justifyContent:'space-around',
      alignItems:'stretch',
    },
    col_selected:{
      backgroundColor:'#fff',
    },
    name:{
      fontSize:14*Utils.scale,
      color:'#fff',
      textAlign:'center',
    },
    name_selected:{
      color:'#ea5656'
    },
});
