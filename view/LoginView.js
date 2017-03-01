//登陆
'use strict';
import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    TextInput,
    StyleSheet,
    StatusBar,
    BackAndroid,
    ToastAndroid,
    Dimensions
} from 'react-native';

import styles from './stylecpxzs';
import Utils from './Utils';
import CustomButton from './comp/CustomButton';
import CheckBox from './comp/CheckBox';
import RegisterView from './RegisterView'
import TabView from './TabView.android';
import FortgetPasswordView from './FortgetPasswordView'
import BackAndroidTool from './utils/BackAndroidTool'

var lastBackPressed = 0;


export default class LoginView extends React.Component{

  constructor(props){
    super(props)
    this.state={
      username:Utils.userpwd?Utils.userpwd.username:'',
      // username:'634810586@qq.com',
      passwd:Utils.userpwd?Utils.userpwd.password:'',
      title:'',
      isLogin:false,
      savepwd:true,
    }
  }
  componentDidMount(){
      BackAndroidTool.addBackAndroidListener(this.props.navigator);
    console.log('LoginView componentWillMount');
    Utils.storage.load({
        key: 'userInfo',
        //autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的同步方法
        autoSync: true,
        //syncInBackground(默认为true)意味着如果数据过期，
        //在调用同步方法的同时先返回已经过期的数据。
        //设置为false的话，则始终强制返回同步方法提供的最新数据(当然会需要更多等待时间)。
        syncInBackground: false
      }).then( (ret) => {
        //如果找到数据，则在then方法中返回
        console.log(ret.username);
        console.log(ret.password);
        Utils.userpwd ={
          username:ret.username,
          password:ret.password,
        }
        this.setState({
          username:ret.username,
          passwd:ret.password,
        })
      }).catch( err => {
        //如果没有找到数据且没有同步方法，
        //或者有其他异常，则在catch中返回
        console.log(err);
      })

  }
  componentWillUnmount(){
    console.log('LoginView unmount');
      // 移除返回键监听
      BackAndroidTool.removeBackAndroidListener();
  }
  //login
  login(){
      // this.refs.loginBtn.requestfocus();
    // this.gotoMain();
      var usernameTxt = this.state.username;
      var passwdTxt = this.state.passwd;

      var param ='';
      param = param +'loginName='+usernameTxt;
      param = param +'&';
      param = param +'password='+passwdTxt;

      // var parameter = JSON.stringify({
      //                                username:usernameTxt,
      //                                password:passwdTxt,
      // });

      console.log();

      Utils.post('userAccount/appLogin',param)
      .then((jsonData)=>{
            if(jsonData){
              console.log('jsondata:'+JSON.stringify(jsonData));
              if(jsonData.success){
                  Utils.isLogin = true;
                  Utils.userInfo = jsonData.userAccount;
                  if (this.state.savepwd) {
                    Utils.userpwd = {
                      username:usernameTxt,
                      password:passwdTxt
                    }
                  }else {
                    Utils.userpwd = {
                      username:usernameTxt,
                      password:''
                    }
                  }

                  Utils.storage.save({
                    key: 'userInfo',  //注意:请不要在key中使用_下划线符号!
                    rawData:Utils.userpwd,
                    //如果不指定过期时间，则会使用defaultExpires参数
                    //如果设为null，则永不过期
                    expires: null,
                  });

                  this.gotoMain();
                  // this.setTimeout(() => {  },500*1);
                }else{
                  Utils.showAlert('错误提示',jsonData.msg);
                 }
            }
            this.refs.loginBtn.setPressed(false);
            })

  }
  checkSelect(checked){
    this.setState({savepwd:!this.state.savepwd})
  }

    handleBack(){

      var datenow = Date.now();

        var overtime = datenow - lastBackPressed;
        console.log('lastBackPressed:'+lastBackPressed+',Date.now():'+datenow+',overtime:'+overtime);
        // 当前页面为root页面时的处理
        if (lastBackPressed){
            if(overtime >= 100){
                if(overtime < 2000){
                    //最近2秒内按过back键，可以退出应用。
                    BackAndroid.exitApp();
                    return true;
                }
            }
        }
        lastBackPressed = Date.now();
        if (overtime >= 100)
            ToastAndroid.show('再按一次退出应用',ToastAndroid.SHORT);
    }

  gotoMain(){
    //goto tabbar page
    this.props.navigator.push({
                          navigationBarHidden:true,
                          component:TabView,
                          wrapperStyle:styles.wrapperStyle,
                          handleBack:this.handleBack,
                          });

  }
  render(){
    return (
      <View style={styles.container}>
      <StatusBar
         barStyle="default"
       />
        <Text style={{textAlign:'center',alignSelf:'stretch',fontSize:20*Utils.scale,paddingVertical:10,marginTop:46*Utils.scale,color:'#333'}}>用户登录</Text>
        <View style={mystyle.iconview}>
          <Image
            source={require('./ico/index_logo.png')}
            style={{width:76*Utils.scale,height:76*Utils.scale,borderRadius:38*Utils.scale,borderWidth:1,borderColor:'#edddc6'}}/>
        </View>
        <View style={{marginLeft:23,marginRight:23,borderRadius:10,height:123*Utils.scale,alignSelf:'stretch',borderWidth:1,borderColor:'#dcdcdc'}}>
            <View style={mystyle.rowview}>
              <Text style={styles.style_input_label}>邮箱</Text>
              <TextInput style={styles.style_input}
                  underlineColorAndroid={'transparent'}
                  autoCorrect={false}
                  onChangeText={(text) => this.setState({username:text})}
                  value={this.state.username}
                  autoCapitalize='none'
                  keyboardType='ascii-capable'
                  placeholderTextColor='#929292'></TextInput>
            </View>
            <View style={styles.splitLine}></View>
            <View style={mystyle.rowview}>
              <Text style={styles.style_input_label}>密码</Text>
              <TextInput style={styles.style_input}
                  underlineColorAndroid={'transparent'}
                  autoCorrect={false}
                  maxLength={12}
                  onChangeText={(text) => this.setState({passwd:text})}
                  value={this.state.passwd}
                  secureTextEntry={true}
                  keyboardType='ascii-capable'
                  placeholderTextColor='#929292'></TextInput>
            </View>
        </View>
        <View style={{marginTop:15,flexDirection:'row'}}>
            <CheckBox
                 ref={'mempwd'}
                 label="记住密码"
                 checked={this.state.savepwd}
                 labelStyle={{marginLeft:23}}
                 boxStyle={{width:150*Utils.scale}}
                 onChange={(checked) => this.checkSelect(checked)} />
            <Text onPress={()=>this.goForgetView()} style={{flex:1,textAlign:'right',marginRight:23,color:'#ea5656',textDecorationLine:'underline'}}>忘记密码?</Text>
        </View>
        <CustomButton
          ref='loginBtn'
          onPress={()=>this.login()}
          text={'安全登录'}>
        </CustomButton>


        <Text onPress={()=>this.goReg()} style={mystyle.regtext}>去注册新用户</Text>
      </View>
    );
  }

  goForgetView(){
    this.props.navigator.push({
                              navigationBarHidden:true,
                              title:'',
                              itemWrapperStyle:styles.wrapperStyle,
                              component:FortgetPasswordView,
    });
  }

  goReg(){
    this.props.navigator.push({
                              navigationBarHidden:true,
                              title:'',
                              itemWrapperStyle:styles.wrapperStyle,
                              component:RegisterView,
    });
  }
}

var {height, width} = Dimensions.get('window');

var mvertical = 30;
var mtop = 100;
if(height < 520){
    mvertical=5;
    mtop = 20;
}

var mystyle = StyleSheet.create({
  rowview:{
      height:60*Utils.scale,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-around',
  },
    iconview:{
      alignItems:'center',
      marginVertical:mvertical
  },
    regtext:{
        flex:1,
        fontSize:16*Utils.scale,
        alignSelf:'stretch',
        textAlign:'center',
        color:'#666',
        marginTop:mtop*Utils.scale,
        textDecorationLine:'underline',
    }
})
