'use strict';
import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    ScrollView,
} from 'react-native';

import styles from './stylecpxzs';
import Utils from './Utils';
import UserRowView from './comp/UserRowView'
import PasswordModifyView from './usercenter/PasswordModifyView'
import TuiGuangView from './usercenter/TuiGuangView'
import TuanduiView from './usercenter/TuanduiView'
import CustomButton from './comp/CustomButton'

export default class UserCenterView extends React.Component{

  static propTypes={
    onClick:React.PropTypes.func,
    loginout:React.PropTypes.func,
  }

  onClick(type:string){
    if(type=='pwdmodify'){
      this.props.onClick && this.props.onClick(PasswordModifyView);
    }
    if (type == 'TuiGuangView') {
      this.props.onClick && this.props.onClick(TuiGuangView);
    }
    if (type == 'TuanduiView') {
      this.props.onClick && this.props.onClick(TuanduiView);
    }
  }

  loginout(){
    this.props.loginout && this.props.loginout();
  }

  render(){
    return (
      <View style={[styles.container_tab,{backgroundColor:'#eeeeee'}]}>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          >
        <View style={{height:270,alignItems:'stretch',flexDirection:'row',backgroundColor:'gray'}}>
          <Image
            source={require('image!user-bg')}
            style={{flex:1,height:270,resizeMode:'stretch',backgroundColor:'#fff0'}}>
            <View style={{alignItems:'center',marginTop:75}}>
              <Image
                  resizeMode={'center'}
                  source={require('image!user_icon')}
                  style={{width:76,height:76,borderRadius:38,borderWidth:3,borderColor:'#fff',backgroundColor:'#fff'}}/>
              </View>
              <View style={{alignItems:'center',marginTop:10}}>
                <Text style={{color:'#fff',fontSize:20}}>{Utils.userInfo.nickName}</Text>
              </View>
              {/*
              <View style={{marginTop:45,flexDirection:'row'}}>
                <View style={{alignItems:'stretch',flex:1}}>
                  <Text style={{textAlign:'center',color:'#fff',fontSize:14}}>{Utils.userInfo.registerTime.split(' ')[0]}</Text>
                  <Text style={{textAlign:'center',marginTop:5,color:'#fff',fontSize:14}}>注册时间</Text>
                </View>
                <View style={{backgroundColor:'#fff',width:.5}}></View>
                <View style={{alignItems:'stretch',flex:1}}>
                  <Text style={{textAlign:'center',color:'#fff',fontSize:14}}>{Utils.userInfo.memberStartTime.split(' ')[0]}</Text>
                  <Text style={{textAlign:'center',marginTop:5,color:'#fff',fontSize:14}}>开通时间</Text>
                </View>
                <View style={{backgroundColor:'#fff',width:.5}}></View>
                <View style={{alignItems:'stretch',flex:1}}>
                  <Text style={{textAlign:'center',color:'#fff',fontSize:14}}>{Utils.userInfo.memberEndTime.split(' ')[0]}</Text>
                  <Text style={{textAlign:'center',marginTop:5,color:'#fff',fontSize:14}}>到期时间</Text>
                </View>
              </View>
              */}
            </Image>
        </View>

        {/*<UserRowView
          img={require('image!01')}
          title={'会员等级:'+Utils.userInfo.vipLevel}
        />
        */}
        <UserRowView
          img={require('image!02')}
          title={'用户名'}
          titleRight={Utils.userInfo.loginName}
        />

        <UserRowView
          img={require('image!04')}
          onNext={()=>this.onClick('pwdmodify')}
          title={'修改密码'}
          titleRight={'修改登陆密码'}
        />
        {/*
        <View style={styles.splitLine_ww}></View>
        <UserRowView
          img={require('image!03')}
          onNext={()=>this.onClick()}
          title={'绑定账号'}
          titleRight={'绑定您的支付账号'}
        />

        <View style={styles.splitLine_ww}></View>
        <UserRowView
          img={require('image!05')}
          onNext={()=>this.onClick()}
          title={'充值记录'}
          titleRight={''}
        />
        <UserRowView
          img={require('image!06')}
          onNext={()=>this.onClick('TuiGuangView')}
          title={'推广链接'}
          titleRight={'复制链接给好友赢奖励'}
        />
        <UserRowView
          img={require('image!07')}
          onNext={()=>this.onClick('TuanduiView')}
          title={'团队管理'}
          titleRight={''}
        />
        <View style={styles.splitLine_ww}></View>
        <UserRowView
          img={require('image!08')}
          onNext={()=>this.onClick()}
          title={'在线客服'}
          titleRight={'小助手交流群：3478869478'}
        />
        <UserRowView
          img={require('image!09')}
          onNext={()=>this.onClick()}
          title={'留言建议'}
          titleRight={'复制链接给好友赢奖励'}
        />
        <UserRowView
          img={require('image!10')}
          onNext={()=>this.onClick()}
          title={'更新版本'}
          titleRight={'当前已是最新版本'}
        />
        */}

        <CustomButton
          ref='loginoutBtn'
          onPress={()=>this.loginout()}
          text={'注销'}>
        </CustomButton>
        </ScrollView>
      </View>
    )
  }
}
