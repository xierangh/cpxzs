'use strict';

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight
} from "react-native"

import Icon from 'react-native-vector-icons/FontAwesome';


export default class CheckBox extends React.Component{
   static defaultProps = {
      label: 'Label',
      labelBefore: false,
      checked: false
    };
  static propTypes={
    label: React.PropTypes.string,
    labelStyle: React.PropTypes.object,
    boxStyle:React.PropTypes.object,
    checked: React.PropTypes.bool,
    onChange: React.PropTypes.func
  };
   constructor(props){
        super(props);
        this.state = {
            checked: this.props.checked,
        };
    }
    componentWillMount(){
        // console.log("checkbox初始化啦:"+this.state.checked);
    }
    componentWillReceiveProps(nextProps) {
      // console.log("checkbox接收到新参数啦 ");
      this.setState({
        checked: nextProps.checked
      });
    }
    componentWillUnmount(){
      // console.log("checkbox组件被销毁了");
    }

  ischecked(){
    return this.state.checked;
  }

  setCheck(checked){
    this.setState({
      checked:checked
    })
  }

  onChange() {
     this.setState({checked:!this.state.checked});
  }

  onClick(){

    var nchecked = !this.state.checked;
    // console.log("checkbox被点击了"+this.state.checked+","+nchecked);
    this.props.onChange(nchecked,this.props.label);
    this.setState({checked:nchecked});
  }

  render() {

    var source = "square-o";

    if(this.state.checked){
      source = "check-square-o";
    }

    var container = (
      <View style={[styles.container,this.props.labelStyle]}>
        <Icon name={source} size={16} style={styles.checkbox} color="#00B4F7" ></Icon>
        <View style={styles.labelContainer}>
          <Text style={[styles.label]}>{this.props.label}</Text>
        </View>
      </View>
    );

    if (this.props.labelBefore) {
      container = (
        <View style={styles.container}>
          <View style={styles.labelContainer}>
            <Text style={[styles.label, this.props.labelStyle]}>{this.props.label}</Text>
          </View>
          <Icon name={source} size={16} style={styles.checkbox} color="#00B4F7" ></Icon>
        </View>
      );
    }

    return (
      <TouchableHighlight ref="checkbox" onPress={()=>this.onClick()} underlayColor='white' style={this.props.boxStyle}>
        {container}
      </TouchableHighlight>
    )
  }
};

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  checkbox: {
    width: 16,
    height: 16
  },
  labelContainer: {
    marginLeft: 2,
    marginRight: 10
  },
  label: {
    fontSize: 15,
    lineHeight: 15,
    color: 'grey',
  }
});
