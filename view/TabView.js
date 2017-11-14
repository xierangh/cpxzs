/**
 *
 *主tab页
 *
 */

'use strict';
import React, {Component} from 'react';
import {
    Text,
    TabBarIOS,
    View,
    NetInfo,
} from 'react-native';

import styles from './stylecpxzs';
import Utils from './Utils'
import FirstPageView from './FirstPageView';
import ExpertPlanView from './ExpertPlanView';
import NoToolView from './NoToolView';
import LoginView from './LoginView';
import UserCenterView from './UserCenterView';
import HistoryView from './firstpage/HistoryView';
import NetWorkTool from './utils/NetWorkTool'
import NewsView from './NewsView'
import RemaPlanView from './firstpage/RemaPlanView'
import ContactUs from './firstpage/ContactUs'


//main view which has many tabbars
export default class tabView extends React.Component{


  constructor(props){
    super(props)
    this.state={
      selectedTab: 'fbTab',
    }
  }

//判断网络是否链接
  handleMethod(isConnected){
    console.log('test', (isConnected ? 'online' : 'offline'));
    Utils.online = isConnected;
    if (!isConnected) {
      Utils.showAlert('网络链接失败，请检查网络是否通畅');
    }
  }

  componentDidMount(){
    // this._connect();
    NetWorkTool.addEventListener(NetWorkTool.TAG_NETWORK_CHANGE,this.handleMethod);
    // NetWorkTool.checkNetworkState(()=>this.handleMethod());
    Utils.storage.load({
        key: 'userInfo',
        //autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的同步方法
        autoSync: true,
        //syncInBackground(默认为true)意味着如果数据过期，
        //在调用同步方法的同时先返回已经过期的数据。
        //设置为false的话，则始终强制返回同步方法提供的最新数据(当然会需要更多等待时间)。
        syncInBackground: true
      }).then( (ret) => {
        //如果找到数据，则在then方法中返回
        console.log('tabview componentDidMount');
        console.log(ret);
        Utils.userpwd ={
          username:ret.username,
          password:ret.password,
        }
      }).catch( err => {
        //如果没有找到数据且没有同步方法，
        //或者有其他异常，则在catch中返回
        console.log(err);
      })
  }

  componentWillUnmount(){
    // this._disconnect();
    NetWorkTool.removeEventListener(NetWorkTool.TAG_NETWORK_CHANGE,this.handleMethod);
  }

  //用户中心跳转
  onClick(component:React.Component){
     this.props.navigator.push({
                              //  leftButtonIcon:require('image!back'),
  //                                                               leftButtonTitle:'',
                              //  onLeftButtonPress:() => this.props.navigator.pop(),
                              //  tintColor:'#fff',
                               navigationBarHidden:true,
                              //  title:'',
                               itemWrapperStyle:styles.wrapperStyle,
                               component:component,
     });

  }
  //go to histroyNumberList view
  goHistory(){
  //                                 console.log(date+':'+content);
     this.props.navigator.push({
                              //  leftButtonIcon:require('image!back'),
  //                                                               leftButtonTitle:'',
                              //  onLeftButtonPress:() => this.props.navigator.pop(),
                              //  tintColor:'#fff',
                               navigationBarHidden:true,
                              //  title:'历史开奖详情',
                               itemWrapperStyle:styles.wrapperStyle,
                               component:HistoryView,
     });
  }
  goPlanView(title,data){
    // console.log('goPlanView'+title+','+data);
    if (data == 'jpPlan') {
      this.setState({
                    selectedTab: 'epTab',
                    });
      return;
    }else if(data == 'zuohao'){
      this.setState({
                    selectedTab: 'ntTab',
                    });
      return;
    }
    var view = HistoryView;
    if(data == 'rema'){
        view = RemaPlanView;
    }
   this.props.navigator.push({
                            //  leftButtonIcon:require('image!back'),
  //                                                               leftButtonTitle:'',
                            //  onLeftButtonPress:() => this.props.navigator.pop(),
                            //  tintColor:'#fff',
                             navigationBarHidden:true,
                            //  title:title,
                             component:view,
                            //  passProps:{
                            //     data:data,
                            //     title:title,
                            //  }
   });
  }

  onNewsPress(){
    this.props.navigator.push({
                              navigationBarHidden:true,
                              title:'',
                              component:ContactUs,
    });
  }
  loginout(){
    // this.props.navigator.pop();
      this.login();
  }

  login(){
      this.props.navigator.push({
          navigationBarHidden:true,
          title:'',
          component:LoginView,
      });
  }
  //define main page's tabs
  render() {
  return(
        <TabBarIOS
          tintColor="#ea5656"
          barTintColor="#fff">
        <TabBarIOS.Item
            icon={require('image!index_default')}
            selectedIcon={require('image!index_selected')}
            title="首页"
            selected={this.state.selectedTab === 'fbTab'}
            onPress={() => {
            this.setState({
                          selectedTab: 'fbTab',
                          });
            }}>
            <FirstPageView
              onItemPress={(title,data)=>this.goPlanView(title,data)}
              onMorePress={()=>this.goHistory()}
              onNewsPress={()=>this.onNewsPress()}
              />
        </TabBarIOS.Item>
        <TabBarIOS.Item
            icon={require('image!jinpin_default')}
            selectedIcon={require('image!jinpin_selected')}
            title="精品计划"
            badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
            selected={this.state.selectedTab === 'epTab'}
            onPress={() => {
            this.setState({
                          selectedTab: 'epTab',
                          });
            }}>
            <ExpertPlanView
                onClick={(component)=>this.onClick(component)}
              />
        </TabBarIOS.Item>
        <TabBarIOS.Item
            icon={require('image!zuohao_default')}
            selectedIcon={require('image!zuohao_selected')}
            title="做号工具"
            selected={this.state.selectedTab === 'ntTab'}
            onPress={() => {
            this.setState({
                          selectedTab: 'ntTab',
                          });
            }}>
            <NoToolView />
        </TabBarIOS.Item>
        <TabBarIOS.Item
            icon={require('image!user_default')}
            selectedIcon={require('image!user_selected')}
            title="我的"
            selected={this.state.selectedTab === 'ucTab'}
            onPress={() => {
            this.setState({
                          selectedTab: 'ucTab',
                          });
            }}>
            <UserCenterView
              onClick={(component)=>this.onClick(component)}
              loginout={()=>this.loginout()}
              login={()=>this.login()}
              />
        </TabBarIOS.Item>
        </TabBarIOS>
        );
  }
  }
