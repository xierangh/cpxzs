'use strict';
import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    TouchableHighlight,
    StyleSheet
} from 'react-native';

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
        <View style={mystyle.col}>
          <Text style={[mystyle.name,this.state.isSelected&&mystyle.name_selected]}>{this.state.value.jhfaName}</Text>
          <Text style={[mystyle.winRate,this.state.isSelected&&mystyle.name_selected]}>准确率:{this.state.value.winRate}%</Text>
        </View>
      </TouchableHighlight>
    )
  }
}

export default class PlanSelectView extends React.Component{

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

    if (value.jhfaCode !== oldValue.jhfaCode) {
      //取消以前的选中项
      for (var ref in this.refs) {
        if(oldValue.jhfaCode == this.refs[ref].props.value.jhfaCode){
          this.refs[ref].setIsSelected(false);
          break;
        }
      }
    }

    this.props.onSelected && this.props.onSelected(value)
    console.log(this.state.selected);
  }

  render(){
    var rows = [];
    var cols = [];

    for (var i = 0; i < this.state.items.length; i++) {
      var item = this.state.items[i];
      var isSelected = (item.jhfaCode == this.state.selected.jhfaCode);
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
      if(cols.length == 5){
        rows.push(
          <View key={rows.length} style={{backgroundColor:'#eee',flexDirection:'row',justifyContent:'space-around',paddingVertical:10}}>
            {cols}
          </View>
        );
        cols=[];
      }
    }

    if(cols.length > 0){
      rows.push(
        <View key={rows.length} style={mystyle.row}>
          {cols}
        </View>
      );
      cols=[];
    }

    return (
      <View>
          {rows}
      </View>
    )
  }
}

const mystyle=StyleSheet.create({
    row:{
      backgroundColor:'#eee',
      flexDirection:'row',
      justifyContent:'space-around',
      paddingVertical:5,
    },
    col:{
      width:70,
      height:30,
    },
    name:{
      fontSize:14,
      textAlign:'center',
    },
    name_selected:{
      color:'rgba(238, 83, 88,1.0)',
    },
    winRate:{
      fontSize:8,
      textAlign:'center',
      marginTop:5
    }
});
