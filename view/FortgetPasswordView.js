//注册
'use strict';
import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    TextInput,
} from 'react-native';

import styles from './stylecpxzs';
import Utils from './Utils';
import CustomButton from './comp/CustomButton';
import NavigatorTitle from './comp/NavigatorTitle'


export default class FortgetPasswordView extends React.Component{

  constructor(props){
    super(props)
    this.state={
        email:'',
        title:'',
    }
  }

  sendEmail(){

    var emailTxt = this.state.email;

    var param ='';
    param = param +'email='+emailTxt;

    Utils.post('userAccount/emailResetPass',param)
    .then((jsonData)=>{
          if(jsonData){
            console.log('jsondata:'+JSON.stringify(jsonData));
            if(jsonData.success){

                Utils.showAlert('小助手提示','邮件发送成功');
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
         text={'找回密码'}>
      </NavigatorTitle>
        <Text style={{marginTop:20,color:'#666',marginLeft:23,fontSize:14}}>请输入注册邮箱号</Text>
        <View style={{marginTop:5,marginLeft:23,marginRight:23,borderRadius:5,height:60,alignSelf:'stretch',borderWidth:1,borderColor:'#dcdcdc'}}>
            <View style={{height:60,flexDirection:'row'}}>
              <TextInput style={styles.style_input}
                  autoCorrect={false}
                  onChangeText={(text) => this.setState({email:text})}
                  value={this.state.email}
                  autoCapitalize='none'
                  keyboardType='ascii-capable'
                  placeholderTextColor='#929292'></TextInput>
            </View>

        </View>

        <CustomButton
            ref='sendEmailBtn'
            onPress={()=>this.sendEmail()}
            text={'发送'}>
        </CustomButton>

      </View>
    );
  }
}
