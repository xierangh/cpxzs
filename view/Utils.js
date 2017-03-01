/**
 *
 *公共使用类
 */

'use strict';
import React, {Component} from 'react';
import {
    Alert,
    Dimensions,
    PixelRatio,
    Platform,
    ToastAndroid
} from 'react-native';

import Toast from 'react-native-root-toast';
import _ from 'lodash'
import Storage from 'react-native-storage';
var pxielRatio = PixelRatio.get();
var SPR = 2;//原来的屏幕是苹果
var scale=SPR/pxielRatio;
if(pxielRatio >= 2){
    scale =1;
}

//url
// let BASE_URL = 'http://192.168.0.211/'
let BASE_URL = 'http://vip.cpxzs.com/'
// let BASE_URL = 'http://www.cpxzs.com/';
let TIME_OUT= 1000*50;
// if (Platform.OS == 'android'){
//     TIME_OUT = 1000*5*5;
// }

let Utils = {
     FONT_BIG_PLUS :24*scale,
     FONT_BIG : 18*scale,
     FONT_BIG_SUB : 16*scale,
     FONT_NORMAL : 14*scale,
     FONT_SMALL : 12*scale,
     FONT_SMALL_S : 11*scale,
   //缩放比例
   scale:scale,
   storage : new Storage({
    //最大容量，默认值1000条数据循环存储
    size: 1000,
    //数据过期时间，默认一整天（1000 * 3600 * 24秒）
    defaultExpires: 1000 * 3600 * 24,
    //读写时在内存中缓存数据。默认启用。
    enableCache: true,
    //如果storage中没有相应数据，或数据已过期，
    //则会调用相应的sync同步方法，无缝返回最新数据。
    sync : {
      //同步方法的具体说明会在后文提到
    }
  }),
  userpwd:{},
  online:false,
  //当前view
  currentView:'',
  LeftMoveToBackLength:100,
	isLogin:false,
	userInfo:{"nickName":"自由国度顶顶顶顶顶1","memberEndTime":"2019-02-13 00:00:00","vipLevel":"SVIP会员",
  "memberStartTime":"2017-01-13 00:00:00","gradeImgUrl":"http://upload.xinzhixu.net/4554565/4679d8c2f64b420f9b1d3d4229ea3c2c.png",
  "registerTime":"2016-07-05 14:33:39","loginName":"634810586@qq.com"},

  getNotoolMargin(){
    var {height, width} = Dimensions.get('window');
    var marg = 5;
    if (height <= 568) {
        marg = 1;
    }
    if(height == 667){
      marg = 3;
    }
    if (pxielRatio){
        marg=3;
    }
    return marg;
  },

	showAlert:function(title:string,msg:string){
        if(Platform.OS == 'ios') {

            let toast = Toast.show(msg, {
                duration: Toast.durations.LONG,
                position: Toast.positions.CENTER,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
                onShow: () => {
                    // calls on toast\`s appear animation start
                },
                onShown: () => {
                    // calls on toast\`s appear animation end.
                },
                onHide: () => {
                    // calls on toast\`s hide animation start.
                },
                onHidden: () => {
                    // calls on toast\`s hide animation end.
                }
            });

// You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
            setTimeout(function () {
                Toast.hide(toast);
            }, 1000);
        }else{
            ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT,ToastAndroid.CENTER);
        }
	},
  //设置超时
  timeout:function(ms, promise) {
    return new Promise(function(resolve, reject) {
      let timeoutId = setTimeout(function() {
        reject(new Error("请求超时"));
      }, ms);
      // console.log(promise);
      promise.then((res) => {
        clearTimeout(timeoutId);
        resolve(res);
      },
      (err) => {
        clearTimeout(timeoutId);
        reject(err);
      })
    })
    .then((response)=>{
      // console.log(response);

      var cookieset = response.headers.map['set-cookie'];
      console.log(cookieset);
      // if (response.url.indexOf('userAccount/appLogin') > 0) {
      //保存cookie
      if(cookieset){
        var cookietmp = response.headers.map['set-cookie'][0];
        if(cookietmp.length > 100){
          Utils.cookie = cookietmp;
          console.log(Utils.cookie);
        }
      }
      return response.json()
    })
    .then((data)=>{

          // console.log('resp:'+JSON.stringify(data));
          //如果数据不是空就返回
          if(data){
              if(data.success == false){
                Utils.showAlert('错误提示',data.msg);
                return null;
              }
              return data;
          }
          if(typeof(data.errorInfo)== 'string'){
              Utils.showAlert('错误提示',data.errorInfo);
          }else{
              Utils.showAlert('错误提示','系统错误');
          }
          return '';
          })
    .catch((error)=>{
           //TODO.
          //  console.warn(error);
          //  Utils.showAlert('警告','网络链接异常');
          console.log(error);
          var msg='网络链接异常'
          if ('请求超时' == error.message) {
            msg = error.message;
            Utils.showAlert('警告',msg);
          }else {
            Utils.showAlert('警告',msg);
            return null;
          }
         })
  },
  cookie:'',
	//post
	post:function(url:string,param:string){
		console.log("url:"+BASE_URL+url+",param:"+param);


	    return Utils.timeout(TIME_OUT,fetch(BASE_URL+url,{
            credentials:'include',
	          method:'post',
	          headers:{
	          'content-type': [ 'application/x-www-form-urlencoded' ],
            'X-Requested-With':'XMLHttpRequest',
            'Cookie':Utils.cookie,
	          },

	          body:param
	          }))
	},
	//get params in url
	getWithParams:function(url:string,param:string){
	    var sendUrl = BASE_URL+url+'?'+param;
	    console.log("url:"+sendUrl);
	    return Utils.timeout(TIME_OUT,fetch(sendUrl,{
	          method:'get',
	          headers:{
	          'content-type': [ 'application/json; charset=utf-8' ],
            'X-Requested-With':'XMLHttpRequest',
            'Cookie':Utils.cookie,
	          }
	          }));
	},

    getDate(datetime){
        if(datetime){
            let arrdate = datetime.split(' ');
            if(arrdate && arrdate.length>0)
                return arrdate[0];
        }
        return '****-**-**'
    },
    getBigSmall(arr:array,farr:array){
        var retarr=[];
        for (var i = 0; i < arr.length; i++) {
            for (var k = 0; k < farr.length; k++) {
                if (arr[i].indexOf(farr[k]) >= 0) {
                    retarr.push(arr[i]);
                    break;
                }
            }
        }
        console.log(retarr.join(' '));
        return retarr;
    },
	//deserve num behind point,保留小数点后num位小数,并4舍5入
	formatNumber:function(value:number,num:number){
		value = value*Math.pow(10,num);
		value = Math.round(value);
		value = value/Math.pow(10,num);
	    var valueStr = value +'';
	    var index = valueStr.indexOf('.');
	    if(index < 0){
	    		return valueStr+'.00';
	    }else{
        valueStr+="0";
      }
	    index = index < valueStr.length ? index+num+1: valueStr.length;
	    return valueStr.substring(0,index);
	},
	//金额 用逗号 隔开
	formatMoney:function(value:string){
		var l = value.split('.')[0].split('').reverse();
		var index = value.indexOf('.');
		var r =''
		if(index >= 0){
			r = value.split('.')[1];
		}
		var t = "";
	    for(var i = 0; i < l.length; i ++ ){
	       t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
	    }
	    return t.split("").reverse().join("") + "." + r;
	},
	//获得大数的单位
	getLargeNumberUnit:function(value:number){
	    if(value>10000 || value < -10000){
	    		return '亿元';
	    }
	    return '万元';
	},
	//排序，array排序数组，sortvalue排序字段，sorttype排序类型：'asc','desc'
	sort:function(array:array,sortValue:array,sortType:array){
		return _.orderBy(array,sortValue,sortType);
	},
	lodash:_,
};

module.exports = Utils;
