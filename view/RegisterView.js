//注册
'use strict';
import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    TextInput,
    StyleSheet,
    Dimensions,
    Platform
} from 'react-native';

import styles from './stylecpxzs';
import Utils from './Utils';
import CustomButton from './comp/CustomButton';
import CheckBox from './comp/CheckBox';


export default class RegisterView extends React.Component{

  constructor(props){
    super(props)
    this.state={
        username:Utils.userInfo?Utils.userInfo.username:'',
        passwd:'',
        confirm_password:'',
        title:'',
        nickName:'',
        checked:true,
        isLogin:false,
    }
  }

  checkSelect(checked){
    // Utils.showAlert('提示','记住密码:'+checked);
  }

  reg(){
    var usernameTxt = this.state.username;
    var nickNameTxt = this.state.nickName;
    var passwdTxt = this.state.passwd;
    var confirm_passwordTxt = this.state.confirm_password;
    if(passwdTxt != confirm_passwordTxt){
      Utils.showAlert('错误信息','请密码不一致，请重新输入')
      this.refs.loginBtn.setPressed(false);
      return;
    }
    //loginName，nickName，pass，confirm_password，code

    // var parameter = JSON.stringify({
    //                                loginName:usernameTxt,
    //                                nickName:nickNameTxt,
    //                                pass:passwdTxt,
    //                                confirm_password:passwdTxt,
    //                                code:'',
    // });

    var param ='';
    param = param +'loginName='+usernameTxt;
    param = param +'&';
    param = param +'nickName='+nickNameTxt;
    param = param +'&';
    param = param +'pass='+passwdTxt;
    param = param +'&';
    param = param +'confirm_password='+passwdTxt;
    param = param +'&';
    param = param +'registerSrc='+Platform.OS;

    // console.log('params:'+parameter);
    Utils.post('userAccount/register',param)
    // Utils.getWithParams('userAccount/register',param)
    .then((jsonData)=>{
          if(jsonData){
            console.log('jsondata:'+jsonData);
            if(jsonData.success){
                Utils.isLogin = true;
                Utils.userInfo = jsonData;
                Utils.storage.save({
                  key: 'userInfo',  //注意:请不要在key中使用_下划线符号!
                  rawData:jsonData,
                  //如果不指定过期时间，则会使用defaultExpires参数
                  //如果设为null，则永不过期
                  expires: 1000 * 3600
                });
                // this.gotoMain();
                Utils.showAlert('提示','注册成功');
              }else{
                Utils.showAlert('错误提示',jsonData.msg);
               }
          }
          this.refs.loginBtn.setPressed(false);
          })
  }

  showInfo(){
    console.log('showInfo');
  }

  render(){
    return (
      <View style={styles.container}>
        <Text style={mystyle.title}>用户注册</Text>

        <View style={{marginLeft:23,marginRight:23,borderRadius:10,height:240*Utils.scale,alignSelf:'stretch',borderWidth:1,borderColor:'#dcdcdc'}}>
            <View style={mystyle.rowview}>
              <TextInput style={styles.style_input}
                  autoCorrect={false}
                  onChangeText={(text) => this.setState({username:text})}
                  value={this.state.username}
                  autoCapitalize='none'
                  keyboardType='ascii-capable'
                  placeholder='邮箱'
                  placeholderTextColor='#929292'></TextInput>
            </View>
            <View style={styles.splitLine}></View>
            <View style={mystyle.rowview}>
            <TextInput style={styles.style_input}
                autoCorrect={false}
                onChangeText={(text) => this.setState({nickName:text})}
                value={this.state.nickName}
                autoCapitalize='none'
                keyboardType='ascii-capable'
                placeholder='昵称(5-10字符)'
                placeholderTextColor='#929292'></TextInput>
            </View>
            <View style={styles.splitLine}></View>
            <View style={mystyle.rowview}>
              <TextInput style={styles.style_input}
                  autoCorrect={false}
                  maxLength={12}
                  onChangeText={(text) => this.setState({passwd:text})}
                  value={this.state.passwd}
                  secureTextEntry={true}
                  keyboardType='ascii-capable'
                  placeholder='密码(6-12数字加字母组成 )'
                  placeholderTextColor='#929292'></TextInput>
            </View>
            <View style={styles.splitLine}></View>
            <View style={mystyle.rowview}>
              <TextInput style={styles.style_input}
                  autoCorrect={false}
                  maxLength={12}
                  onChangeText={(text) => this.setState({confirm_password:text})}
                  value={this.state.confirm_password}
                  secureTextEntry={true}
                  keyboardType='ascii-capable'
                  placeholder='确认密码'
                  placeholderTextColor='#929292'></TextInput>
            </View>
        </View>
        <View style={{marginTop:15,flexDirection:'row'}}>
            <CheckBox
                 ref={'mempwd'}
                 label=""
                 checked={this.state.checked}
                 labelStyle={{marginLeft:23}}
                 boxStyle={{width:50}}
                 onChange={(checked) => this.checkSelect(checked)} />
            <Text onPress={()=> this.showInfo()} style={{flex:1,fontSize:12,textAlign:'left',marginRight:23,color:'#999'}}>我已阅读并接受《版权声明》和《隐私保护》</Text>
        </View>
        <CustomButton
            ref='loginBtn'
            onPress={()=>this.reg()}
            text={'安全注册'}>
        </CustomButton>


        <Text onPress={()=>this.props.navigator.pop()} style={mystyle.regtext}>已有账号 去登录</Text>
      </View>
    );
  }
}

var {height, width} = Dimensions.get('window');

var mvertical = 30;
var mtop = 46;
var mbottom = 20;
if(height < 520){
    mvertical=5;
    mtop = 30;
    mbottom = 0;
}

var mystyle = StyleSheet.create({
  rowview:{
    height:60*Utils.scale,
    flexDirection:'row',
    alignItems:'center'
  },
    regtext:{
        flex:1,
        fontSize:16*Utils.scale,
        alignSelf:'stretch',
        textAlign:'center',
        color:'#ea5656',
        marginTop:mtop*Utils.scale
    },
    title:{
        textAlign:'center',
        alignSelf:'stretch',
        fontSize:20*Utils.scale,
        color:'#333',
        paddingVertical:10,
        marginTop:mtop,
        marginBottom:mbottom
    }
})
