'use strict';
import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
} from 'react-native';

import styles from './../stylecpxzs'
import NextPeriod from './../model/NextPeriod'

let np = new NextPeriod();

export default class NotoolTimeView extends React.Component{
  static propTypes={
    nextPeriodStr:React.PropTypes.string,
    seconds:React.PropTypes.number,
    isFirstPage:React.PropTypes.bool,
    refresh:React.PropTypes.func,
  }
  static defaultProps={
    isFirstPage:false,
  }
  constructor(props) {
    super(props)

    this.state={
      seconds:np.seconds,
      nextPeriodStr:np.nextPeriodStr,
      isFirstPage:this.props.isFirstPage,
    }
    // np.addCallback(this);
    // console.log('NotoolTimeView create'+this.state.seconds+this.state.nextPeriodStr);
    this.setNextPeroid(np.getNextPeroidStr(),np.getSecond());
  }

  componentWillUnmount() {
    // 如果存在this.timer，则使用clearTimeout清空。
    // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
    console.log('componentWillUnmount');
    this.timer && clearTimeout(this.timer);
  }

  setNextPeroid(nextPeriodStr:string,seconds:number){
    // console.log('setNextPeroid'+seconds+"--"+nextPeriodStr);
    //首先清空timer
    this.timer && clearTimeout(this.timer);

    this.setState({
      nextPeriodStr:nextPeriodStr,
      seconds:seconds,
    })

    this.timer = setInterval(
      () => {
        var nextPeriodStr = np.getNextPeroidStr()
        var seconds = np.getSecond()
        // if(seconds <= 0){
        //   this.props.refresh && this.props.refresh();
        //   console.log("this.props.refresh");
        // }else {
          this.setState({
            seconds:seconds,
            nextPeriodStr:nextPeriodStr,
          })
        // }
      },
      1000
    );
  }

  getHour(){
    var hour = this.state.seconds/3600;
    return this.formatTime(hour);
  }

  getMinute(){
    var hour = parseInt(this.getHour());
    var minute = (this.state.seconds-3600*hour)/60;
    return this.formatTime(minute);
  }

  getSecond(){
    var second = this.state.seconds%60;
    second = second+'';
    if(second.length<2)
      second = '0'+second;
    return second;
  }

  formatTime(value){
    // var hour = this.state.seconds/3600;
    // var minute = (this.state.seconds-3600*hour)/60;
    // var seconds = this.state.seconds%3600;
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
          <Text style={styles.firstPage_kaijiang_right_3_left}>距离第{this.state.nextPeriodStr}</Text>
          <Text style={styles.firstPage_kaijiang_right_3_right}>开奖倒计时</Text>
          <Text style={styles.firstPage_kaijiang_right_3_right_time}>{this.getHour()}:{this.getMinute()}:{this.getSecond()}</Text>
        </View>
        :
        <View style={{backgroundColor:'#fff',flexDirection:'row',paddingVertical:5,justifyContent:'center'}}>
          <Image source={require('./../ico/logo_min.png')} style={{marginLeft:10,marginRight:2,width:20,height:20}} / >
          <Text style={{textAlign:'left',flex:1,alignSelf:'center'}}>{this.state.nextPeriodStr}</Text>
           <View style={{flexDirection:'row'}}>
                <Text style={{textAlign:'center',alignSelf:'center'}}>投注时间剩余:</Text>
                <Text style={{fontSize:18,color:'#ea5656',alignSelf:'center'}}>{this.getHour()}</Text>
                <Text style={{textAlign:'center',alignSelf:'center'}}>时</Text>
                <Text style={{fontSize:18,color:'#ea5656',alignSelf:'center'}}>{this.getMinute()}</Text>
                <Text style={{textAlign:'center',alignSelf:'center'}}>分</Text>
                <Text style={{fontSize:18,color:'#ea5656',alignSelf:'center'}}>{this.getSecond()}</Text>
                <Text style={{textAlign:'center',alignSelf:'center'}}>秒</Text>
          </View>
        </View>
      }
      </View>

    )
  }
}
