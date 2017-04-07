
import React from 'react'

import {
    View,
    Text,
    Button,
    Clipboard,
    StyleSheet
}from 'react-native'

import Utils from './../Utils'
import styles from './../stylecpxzs'
import NavigatorTitle from './../comp/NavigatorTitle'


export default class VipchargeView2 extends React.Component{

    copyno(qqnum){
        Clipboard.setString(qqnum);
        Utils.showAlert('','拷贝QQ号码成功');
    }

    copyzfb(qqnum){
        Clipboard.setString(qqnum);
        Utils.showAlert('','拷贝支付宝账号成功');
    }

    render(){
        return(
            <View style={styles.container}>
                <NavigatorTitle
                    onPress={()=>this.props.navigator.pop()}
                    text={'账户充值'}>
                </NavigatorTitle>
                <View style={{marginVertical:40,marginHorizontal:20}}>
                    <Text>请联系客服人员，确认支付金额，然后向官方支付宝账号打款。开通成功后，请重新登录。</Text>
                    <View style={{marginVertical:10}}>
                        <Text style={mystyle.text}>联系客服QQ:2878125716</Text>
                        <Button title="复制QQ号码" onPress={()=>this.copyno('2878125716')}/>
                    </View>
                    <View style={{marginVertical:10}}>
                        <Text style={mystyle.text}>联系客服QQ:2389363092</Text>
                        <Button title="复制QQ号码" onPress={()=>this.copyno('2389363092')}/>
                    </View>

                    <View style={{marginVertical:10}}>
                        <Text style={mystyle.text}>官方支付宝账号:358544337@qq.com</Text>
                        <Button title="复制支付宝账号" onPress={()=>this.copyzfb('358544337@qq.com')}/>
                    </View>
                </View>
            </View>
        )
    }
}

const mystyle = StyleSheet.create({
    text:{
        fontSize:16,
        color:'#ea5656',
    }
})