'use strict';
import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
} from 'react-native';

import Utils from './../Utils'
import styles from './../stylecpxzs'
import NextPeriod from './../model/NextPeriod'
import moment from 'moment'

import {autorun} from 'mobx'
import { observer } from 'mobx-react/native';

let np = new NextPeriod();

@observer
export default class NotoolTimeView extends React.Component{
  static propTypes={
    isFirstPage:React.PropTypes.bool,
    refresh:React.PropTypes.func,
  }

  static defaultProps={
    isFirstPage:false,
  }

  constructor(props) {
    super(props)

    this.state={
      isFirstPage:this.props.isFirstPage,
    }

      autorun(()=>{
          if (np.shouldfresh){
              this.props.refresh && this.props.refresh();
              console.log(`shouldfresh is ${np.shouldfresh}--${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}`)
          }
      })
  }

  componentWillUnmount() {
    // 如果存在this.timer，则使用clearTimeout清空。
    // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
    console.log('componentWillUnmount');
    this.timer && clearTimeout(this.timer);
  }

  setNextPeroid(nextPeriodStr:string,seconds:number){
    np.nextPeriodStr = nextPeriodStr;
    np.seconds = seconds;
    np.shouldfresh = true;

    //100ms后修改回去
    setTimeout(()=>{
      np.shouldfresh = false;
    },100);
  }

  getHour(){
    var hour = np.seconds/3600;
    return this.formatTime(hour);
  }

  getMinute(){
    var hour = parseInt(this.getHour());
    var minute = (np.seconds-3600*hour)/60;
    return this.formatTime(minute);
  }

  getSecond(){
    var second = np.seconds%60;
    second = second+'';
    if(second.length<2)
      second = '0'+second;
    return second;
  }

  formatTime(value){
    var valueStr = value +'';
    var index = valueStr.indexOf('.');
    if(index < 0){
        return valueStr;
    }
    valueStr = valueStr.substring(0,index);
    if(valueStr.length <2){
      valueStr ='0'+valueStr;
    }
    return valueStr;
  }

  render(){

    return (
      <View>
          {this.state.isFirstPage?
              <View style={styles.firstPage_kaijiang_right_3}>
                <Text style={styles.firstPage_kaijiang_right_3_left}>距离第{np.nextPeriodStr}期</Text>
                <Text style={styles.firstPage_kaijiang_right_3_right}>开奖</Text>
                <Text style={styles.firstPage_kaijiang_right_3_right_time}>{this.getHour()}:{this.getMinute()}:{this.getSecond()}</Text>
              </View>
              :
              <View style={{backgroundColor:'#fff',flexDirection:'row',paddingVertical:5,justifyContent:'center'}}>
                <Image source={require('./../ico/logo_min.png')} style={{marginLeft:10,marginRight:2,width:20*Utils.scale,height:20*Utils.scale}} />
                <Text style={{textAlign:'left',flex:1,alignSelf:'center'}}>{np.nextPeriodStr}期</Text>
                <View style={{flexDirection:'row'}}>
                  <Text style={{textAlign:'center',alignSelf:'center'}}>时间剩余:</Text>
                  <Text style={{width:23*Utils.scale,fontSize:18*Utils.scale,color:'#ea5656',alignSelf:'center'}}>{this.getHour()}</Text>
                  <Text style={{textAlign:'center',alignSelf:'center'}}>时</Text>
                  <Text style={{width:23*Utils.scale,fontSize:18*Utils.scale,color:'#ea5656',alignSelf:'center'}}>{this.getMinute()}</Text>
                  <Text style={{textAlign:'center',alignSelf:'center'}}>分</Text>
                  <Text style={{width:23*Utils.scale,fontSize:18*Utils.scale,color:'#ea5656',alignSelf:'center'}}>{this.getSecond()}</Text>
                  <Text style={{textAlign:'center',alignSelf:'center'}}>秒</Text>
                </View>
              </View>
          }
      </View>

    )
  }
}
