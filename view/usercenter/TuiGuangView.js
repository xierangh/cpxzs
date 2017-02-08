//推广连接
'use strict';
import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    Clipboard,
    TouchableHighlight
} from 'react-native';

import styles from './../stylecpxzs';
import Utils from './../Utils';
import CustomButton from './../comp/CustomButton';
import NavigatorTitle from './../comp/NavigatorTitle'


export default class TuiGuangView extends React.Component{
  constructor(props) {
    super(props)
  }

  onPress(){
    Clipboard.setString('http://cpxzs.com')
    Utils.showAlert('拷贝成功')
  }

  render(){
    return(
      <View style={styles.container}>
      <NavigatorTitle
         onPress={()=>this.props.navigator.pop()}
         text={'推广链接'}>
      </NavigatorTitle>
      <View style={{marginTop:10,marginHorizontal:10}}>
        <View>
          <Text style={{marginVertical:10}}>http://cpxzs.com/</Text>
          <Text>彩票小助手是一款由专家精细打磨的彩票分析软件，涵盖市面上所有知名计划：宝宝计划，黑马计划等200多套纯人工原创计划;最专业的时时彩做号工具、时时彩遗漏查询统计等功能，手把手教你成为高手，还等什么？我都已经赚了好多倍了。</Text>
        </View>
        <View style={[styles.splitLine,{marginVertical:10}]}></View>
        <View style={{justifyContent:'flex-end',flexDirection:'row'}}>
          <TouchableHighlight
            underlayColor={'#0002'}
            onPress={() => this.onPress()}>
              <View style={{backgroundColor:'#fff',borderRadius:3,width:66,height:30,borderWidth:1,marginRight:10,borderColor:'#ffaf48',justifyContent:'center',marginLeft:1,marginTop:1}}>
                <Text style={{textAlign:'center',color:'#ffaf48'}}>复制链接</Text>
              </View>
          </TouchableHighlight>
        </View>
      </View>
      <View>
        <Text>只有SVIP用户才能拥有推广链接哦</Text>
        <View style={{justifyContent:'flex-end',flexDirection:'row'}}>
          <TouchableHighlight
            underlayColor={'#0002'}
            onPress={() => this.onPress()}>
              <View style={{backgroundColor:'#fff',borderRadius:3,width:66,height:30,borderWidth:1,marginRight:10,borderColor:'#ffaf48',justifyContent:'center',marginLeft:1,marginTop:1}}>
                <Text style={{textAlign:'center',color:'#ffaf48'}}>开通SVIP</Text>
              </View>
          </TouchableHighlight>
        </View>
      </View>
      </View>
    );
  }
}
