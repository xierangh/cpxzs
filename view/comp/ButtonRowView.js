/**
 * 一行button
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    TouchableHighlight,
    StyleSheet,
    ScrollView
} from 'react-native';

import Utils from './../Utils'
class Button extends React.Component{
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
        <View style={{flex:1}}>
          <TouchableHighlight
            underlayColor={'#fff2'}
            onPress={()=>this.onClick()}>
            <View style={[mystyle.col,this.state.isSelected&&mystyle.col_selected]}>
              <Text style={[mystyle.name,this.state.isSelected&&mystyle.name_selected]}>{this.state.value.name}</Text>
            </View>
          </TouchableHighlight>
        </View>
    )
  }
}

export default class ButtonRowView extends React.Component{

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
    console.log('ButtonRowView create');
  }

    componentWillReceiveProps(next){
        this.setState({
            items:next.items
        })
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

    if (value.value !== oldValue.value) {
      //取消以前的选中项
      for (var ref in this.refs) {
        if(oldValue.value == this.refs[ref].props.value.value){
          this.refs[ref].setIsSelected(false);
          break;
        }
      }
    }

    this.props.onSelected && this.props.onSelected(value)
    console.log(value);
  }

  render(){

    var cols = [];
    for (var i = 0; i < this.state.items.length; i++) {
      var item = this.state.items[i];
      var isSelected = (item.value == this.state.selected.value);
      var refstr = 'nc'+i;
      var nc = <Button
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
        <ScrollView
            automaticallyAdjustContentInsets={false}
            style={mystyle.row}
            contentContainerStyle={mystyle.content}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            removeClippedSubviews={true}
            horizontal={true}>
              {cols}
        </ScrollView>
    )
  }
}

const mystyle=StyleSheet.create({
    row:{
        flex:1,
        height:30,
    },
    content:{
      paddingVertical:3
    },
    col:{
        alignItems:'center',
        marginHorizontal:5,
        justifyContent:'space-around',
        paddingVertical:3,
        paddingHorizontal:5,
    },
    col_selected:{
        backgroundColor:'#ea5656',
        borderRadius:4,
    },
    name:{
      fontSize:14*Utils.scale,
      textAlign:'center',

    },
    name_selected:{
      color:'#fff',
    }
});
