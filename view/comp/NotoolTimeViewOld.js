'use strict';
import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    PixelRatio
} from 'react-native';

import styles from './../stylecpxzs'
import Utils from './../Utils'



var nextPeriodStr_g ='';
var seconds_g = 0;
export default class NotoolTimeViewOld extends React.Component{
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
      seconds:this.props.seconds,
      nextPeriodStr:this.props.nextPeriodStr,
      isFirstPage:this.props.isFirstPage,
    }
    console.log('NotoolTimeView create'+this.state.seconds+this.state.nextPeriodStr);
  }

  componentDidMount(){
    this.queryTime();
  }

  queryTime(){
    this.timer && clearTimeout(this.timer);

     Utils.getWithParams('caipiaoNumber/queryNextPeriod')
     .then((data)=>{
           if(!data){
              this.refs.timeview.setNextPeroid('','');
              return;
            }
            //  console.log(JSON.stringify(data))
            var seconds = parseInt(data.hour)*3600 + parseInt(data.minute)*60+parseInt(data.second);
            this.setNextPeroid(data.nextPeriodStr,seconds);
            nextPeriodStr_g = data.nextPeriodStr;
            seconds_g = seconds;
       })
  }

  setNextPeroid(nextPeriodStr:string,seconds:number){
    //首先清空timer
    this.timer && clearTimeout(this.timer);
    if (nextPeriodStr == '') {
      this.setState({
        seconds:599,
      })
    }else{
      this.setState({
        nextPeriodStr:nextPeriodStr,
        seconds:seconds,
      })
    }

    this.timer = setInterval(
      () => {
        var seconds= this.state.seconds-1;
        if(seconds <= 0){
          if (this.state.nextPeriodStr != nextPeriodStr_g) {
            this.setState({
              nextPeriodStr:nextPeriodStr_g,
              seconds:seconds_g,
            })
          }else {
            this.queryTime();
            console.log("this.props.refresh");
          }
          this.props.refresh && this.props.refresh();
        }else {
        this.setState({
          seconds:seconds
        })
      }
      },
      1000
    );
  }

  componentWillUnmount() {
    // 如果存在this.timer，则使用clearTimeout清空。
    // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
    this.timer && clearTimeout(this.timer);
  }

  getHour(){
    var hour = this.state.seconds/3600;
    return this.formatTime(hour);
  }

  getMinute(){
    var hour = parseInt(this.getHour());
    var minute = (this.state.seconds-3600*hour)/60;
    // console.log('getMinute:'+minute);
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
        if(valueStr.length <2){
          valueStr ='0'+valueStr;
        }
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
          <Text style={styles.firstPage_kaijiang_right_3_left}>距离第{this.state.nextPeriodStr}期</Text>
          <Text style={styles.firstPage_kaijiang_right_3_right}>开奖</Text>
          <Text style={styles.firstPage_kaijiang_right_3_right_time}>{this.getHour()}:{this.getMinute()}:{this.getSecond()}</Text>
        </View>
        :
        <View style={{backgroundColor:'#fff',flexDirection:'row',paddingVertical:5,justifyContent:'center'}}>
          <Image source={require('./../ico/logo_min.png')} style={{marginLeft:10,marginRight:2,width:20*Utils.scale,height:20*Utils.scale}} / >
          <Text style={{textAlign:'left',flex:1,alignSelf:'center'}}>{this.state.nextPeriodStr}期</Text>
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
