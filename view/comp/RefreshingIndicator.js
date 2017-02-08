import React, {Component} from 'react';
import {
    View,
    Text,
    ActivityIndicatorIOS,
    PropTypes,
    StyleSheet,
    isValidElement,
    createElement,
    Image,
} from 'react-native';

var RefreshingIndicator = {
    pullingIndicatorRender:function(){
        return(
               <View style={stylesheet.container}>

               <Text style={stylesheet.text}>向下滑动进行刷新</Text>
               </View>
               );
    },
    holdingIndicatorRender:function(){
        return(
               <View style={stylesheet.container}>

               <Text style={stylesheet.text}>释放后开始刷新</Text>
               </View>
               );
    },
    refreshingIndicatorRender:function(){
        return(
               <View style={stylesheet.container}>
               <ActivityIndicatorIOS
               style={stylesheet.image}
               />
               <Text style={stylesheet.text}>正在刷新</Text>
               </View>
               );
    },
}

var stylesheet = StyleSheet.create({
                                   container: {
                                   flex: 1,
                                   alignItems: 'flex-start',
                                   flexDirection: 'row',
                                   alignSelf:'stretch',
                                   },
                                   image:{
                                   marginLeft:30,
                                   height:20,
                                   width:20,
                                   },
                                   text: {
                                   flex: 2,

                                   alignSelf:'center',
                                   textAlign:'center',
                                   marginRight:50,
                                   color:'#ffffff',
                                   },
                                   wrapper: {
                                   height: 60,
                                   },
                                   content: {
                                   marginTop: 10,
                                   height: 40,
                                   },
                                   })

module.exports = RefreshingIndicator
