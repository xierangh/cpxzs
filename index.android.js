/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';

import LoginView from './view/LoginView';
// import TabView from './TabView.android';

export default class cpxzs extends Component {
  render() {
    return (
      <Navigator
        style={{flex:1}}
        initialRoute={{component: LoginView}}
        configureScene={this.configureScene}
        renderScene={this.renderScene}/>
    );
  }

  /**
   * 配置场景动画
   * @param route 路由
   * @param routeStack 路由栈
   * @returns {*} 动画
   */
  configureScene(route, routeStack) {
    if (route.type == 'Bottom') {
      return Navigator.SceneConfigs.FloatFromBottom; // 底部弹出
    }
    return Navigator.SceneConfigs.PushFromRight; // 右侧弹出
  }

  /**
  * 使用动态页面加载
  * @param route 路由
  * @param navigator 导航器
  * @returns {XML} 页面
  */
 renderScene(route, navigator) {
   return <route.component navigator={navigator}  {...route.passProps} />;
 }
}

AppRegistry.registerComponent('cpxzs', () => cpxzs);
