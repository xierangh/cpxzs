//修改密码
'use strict';
import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    TextInput,
} from 'react-native';

import styles from './../stylecpxzs';
import Utils from './../Utils';
import CustomButton from './../comp/CustomButton';
import NavigatorTitle from './../comp/NavigatorTitle'


export default class PasswordModifyView extends React.Component{

  constructor(props){
    super(props)
    this.state={
        passwd:'',
        new_passwd:'',
        confirm_passwd:'',
        title:'',
        isLogin:false,
    }
  }

  changePwd(){

    var passwdTxt = this.state.passwd;
    var newpasswdTxt = this.state.new_passwd;
    var cfpasswdTxt = this.state.confirm_passwd;

//oldPass,newPass,confirm_pass
    var param ='';
    param = param +'oldPass='+passwdTxt;
    param = param +'&';
    param = param +'newPass='+newpasswdTxt;
    param = param +'&';
    param = param +'confirm_pass='+cfpasswdTxt;

    Utils.post('userAccount/upPass',param)
    .then((jsonData)=>{
          if(jsonData){
            console.log('jsondata:'+JSON.stringify(jsonData));
            if(jsonData.success){
                Utils.isLogin = true;

                Utils.showAlert('修改密码成功');
              }else{
                Utils.showAlert('错误提示',jsonData.msg);
               }
          }
          this.refs.loginBtn.setPressed(false);
          })
  }

  render(){
    return (
      <View style={styles.container}>
      <NavigatorTitle
         onPress={()=>this.props.navigator.pop()}
         text={'修改密码'}>
      </NavigatorTitle>
        <View style={{marginTop:20,marginLeft:23,marginRight:23,borderRadius:5,height:180,alignSelf:'stretch',borderWidth:1,borderColor:'#dcdcdc'}}>
            <View style={{height:60,flexDirection:'row'}}>
              <TextInput style={styles.style_input}
                  autoCorrect={false}
                  onChangeText={(text) => this.setState({passwd:text})}
                  value={this.state.username}
                  autoCapitalize='none'
                  secureTextEntry={true}
                  keyboardType='ascii-capable'
                  placeholder='请输入原密码'
                  placeholderTextColor='#929292'></TextInput>
            </View>
            <View style={styles.splitLine}></View>
            <View style={{height:60,flexDirection:'row'}}>
            <TextInput style={styles.style_input}
                autoCorrect={false}
                onChangeText={(text) => this.setState({new_passwd:text})}
                value={this.state.new_passwd}
                autoCapitalize='none'
                secureTextEntry={true}
                keyboardType='ascii-capable'
                placeholder='请输入新密码'
                placeholderTextColor='#929292'></TextInput>
            </View>
            <View style={styles.splitLine}></View>
            <View style={{height:60,flexDirection:'row'}}>
              <TextInput style={styles.style_input}
                  autoCorrect={false}
                  onChangeText={(text) => this.setState({confirm_passwd:text})}
                  value={this.state.confirm_passwd}
                  secureTextEntry={true}
                  keyboardType='ascii-capable'
                  placeholder='请输入确认密码'
                  placeholderTextColor='#929292'></TextInput>
            </View>

        </View>

        <CustomButton
            ref='loginBtn'
            onPress={()=>this.changePwd()}
            text={'确定'}>
        </CustomButton>

      </View>
    );
  }
}
