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

import TabView from './view/TabView.android';
import LoginView from './view/LoginView';
import Utils from './view/Utils';
import styles from './view/stylecpxzs'
import codePush from "react-native-code-push";


export default class cpxzs extends React.Component{

 constructor(props){
   super(props)
 }
 componentDidMount(){
   //设置电池／时间
   //StatusBarIOS.setStyle('light-content');
     this.update();
     setInterval(() => {
         this.update();
     }, 1000 * 60 * 5);
 }

    update() {
        // Utils.showAlert('','update');
        codePush.sync({
            updateDialog: {
                appendReleaseDescription: true,
                title: '提示更新',
                descriptionPrefix: "\n\n更新内容:\n",
                mandatoryContinueButtonLabel: '升级',
                mandatoryUpdateMessage: '',
            },
            installMode: codePush.InstallMode.IMMEDIATE
        });
    }
 //define main page's tabs
 render() {
  // var view = Utils.isLogin ? TabView : LoginView;
  var view = TabView ;
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
 }
}

AppRegistry.registerComponent('cpxzs', () => cpxzs);
