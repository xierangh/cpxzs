/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {Component} from 'react';
import {
  AppRegistry,
  NavigatorIOS,
  StatusBarIOS
} from 'react-native';

import TabView from './view/TabView';
import LoginView from './view/LoginView';
import Utils from './view/Utils';
import styles from './view/stylecpxzs'

var cpxzs =  React.createClass({
                               getInitialState: function() {
                                   return {
                                   };
                               },
                               componentDidMount:function(){
                                 //设置电池／时间
                                 //StatusBarIOS.setStyle('light-content');
                               },
                               //define main page's tabs
                               render:function() {
                                var view = Utils.isLogin ? TabView : LoginView;
                                return(
                                       <NavigatorIOS
                                       	   ref='mainTab'
                                           navigationBarHidden={true}
                                           shadowHidden={false}
                                           tintColor='#fff'
                                           style={{flex : 1, marginTop : 0}}
                                           initialRoute={{
                                               title:'',
                                               component: view,
                                               wrapperStyle:styles.wrapperStyle
                                           }}
                                       />
                                );
                               },
});

AppRegistry.registerComponent('cpxzs', () => cpxzs);