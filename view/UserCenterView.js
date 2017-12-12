'use strict';
import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    ScrollView,
    Platform,
    StatusBar
} from 'react-native';

import styles from './stylecpxzs';
import Utils from './Utils';
import UserRowView from './comp/UserRowView'
import PasswordModifyView from './usercenter/PasswordModifyView'
import TuiGuangView from './usercenter/TuiGuangView'
import TuanduiView from './usercenter/TuanduiView'
// import VipchargeView from './usercenter/VipchargeView'
import VipchargeView2 from './usercenter/VipchargeView2'
import CustomButton from './comp/CustomButton'



export default class UserCenterView extends React.Component{

  static propTypes={
    onClick:React.PropTypes.func,
    loginout:React.PropTypes.func,
    login:React.PropTypes.func,
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
    if (type == 'VipchargeView') {
        this.props.onClick && this.props.onClick(VipchargeView2);
    }
  }

  loginout(){
      this.props.loginout && this.props.loginout();
      this.refs.loginoutBtn.setPressed(false)
      Utils.userInfo={}
      Utils.isLogin = false
  }

  login(){
    this.props.login && this.props.login();
    this.refs.loginoutBtn.setPressed(false)
  }

  render(){

    return (
      <View style={styles.container}>
          <StatusBar
              backgroundColor="#f000"
              barStyle="default"
              translucent={true}
          />
        <ScrollView
            style={{backgroundColor:'#eeeeee',paddingBottom:50}}
            automaticallyAdjustContentInsets={false}
          >
        <View style={{height:270*Utils.scale,alignItems:'stretch',flexDirection:'row',backgroundColor:'gray'}}>
          <Image
            source={require('./ico/user_bg.png')}
            style={{flex:1,height:270*Utils.scale,resizeMode:'stretch',backgroundColor:'#fff0'}}>
            <View style={{alignItems:'center',marginTop:75*Utils.scale}}>
              <Image
                  source={require('./ico/icon.png')}
                  style={{width:76*Utils.scale,height:76*Utils.scale,borderRadius:38*Utils.scale,borderWidth:3,borderColor:'#fff'}}/>
              </View>
              <View style={{alignItems:'center',marginTop:10}}>
                <Text style={{color:'#fff',fontSize:20*Utils.scale}}>{Utils.userInfo.nickName}</Text>
              </View>

              <View style={{marginTop:40*Utils.scale,flexDirection:'row'}}>
                <View style={{alignItems:'stretch',flex:1}}>
                  <Text style={{textAlign:'center',color:'#fff',fontSize:14*Utils.scale}}>{Utils.getDate(Utils.userInfo.registerTime)}</Text>
                  <Text style={{textAlign:'center',marginTop:3*Utils.scale,color:'#fff',fontSize:14*Utils.scale}}>注册时间</Text>
                </View>
                <View style={{backgroundColor:'#fff',width:.5*Utils.scale}}></View>
                <View style={{alignItems:'stretch',flex:1}}>
                  <Text style={{textAlign:'center',color:'#fff',fontSize:14*Utils.scale}}>{Utils.getDate(Utils.userInfo.memberStartTime)}</Text>
                  <Text style={{textAlign:'center',marginTop:3*Utils.scale,color:'#fff',fontSize:14*Utils.scale}}>开通时间</Text>
                </View>
                <View style={{backgroundColor:'#fff',width:.5*Utils.scale}}></View>
                <View style={{alignItems:'stretch',flex:1}}>
                  <Text style={{textAlign:'center',color:'#fff',fontSize:14*Utils.scale}}>{Utils.getDate(Utils.userInfo.memberEndTime)}</Text>
                  <Text style={{textAlign:'center',marginTop:3*Utils.scale,color:'#fff',fontSize:14*Utils.scale}}>到期时间</Text>
                </View>
              </View>


            </Image>
        </View>
            {Utils.isLogin == false ?
                <View>
                </View>

                :
                <View>

                    <UserRowView
                        img={require('./ico/u02.png')}
                        title={'用户名'}
                        titleRight={Utils.userInfo.loginName}
                    />
                    <UserRowView
                        img={require('./ico/u04.png')}
                        onNext={()=>this.onClick('pwdmodify')}
                        title={'修改密码'}
                        titleRight={'修改登陆密码'}
                    />
                </View>
            }


        <View style={styles.splitLine_ww}></View>
            {/*
             <UserRowView
             img={require('./ico/u01.png')}
             title={'会员等级'}
             />
        <UserRowView
          img={require('./ico/u05.png')}
          onNext={()=>this.onClick('VipchargeView')}
          title={'账户充值'}
          titleRight={''}
        />


         <View style={styles.splitLine_ww}></View>
         <UserRowView
             img={require('./ico/u03.png')}
             onNext={()=>this.onClick('')}
             title={'绑定账号'}
             titleRight={'绑定您的支付账号'}
             />

        <UserRowView
          img={require('./ico/u06.png')}
          onNext={()=>this.onClick('TuiGuangView')}
          title={'推广链接'}
          titleRight={'复制链接给好友赢奖励'}
        />
        <UserRowView
          img={require('./ico/u07.png')}
          onNext={()=>this.onClick('TuanduiView')}
          title={'团队管理'}
          titleRight={''}
        />

        <View style={styles.splitLine_ww}></View>
        <UserRowView
          img={require('./ico/u08.png')}
          onNext={()=>this.onClick()}
          title={'在线客服'}
          titleRight={'小助手交流群：3478869478'}
        />
        <UserRowView
          img={require('./ico/u09.png')}
          onNext={()=>this.onClick()}
          title={'留言建议'}
          titleRight={'复制链接给好友赢奖励'}
        />
             */}

        <UserRowView
          img={require('./ico/u10.png')}
          title={'当前版本'}
          titleRight={'1.0.2'}
        />


            {Utils.isLogin == false ?
                <CustomButton
                    ref='loginoutBtn'
                    onPress={()=>this.login()}
                    text={'登录'}>
                </CustomButton>
                :
                <CustomButton
                    ref='loginoutBtn'
                    onPress={()=>this.loginout()}
                    text={'注销'}>
                </CustomButton>
            }



        <View style={styles.space}></View>
        </ScrollView>
      </View>
    )
  }
}
