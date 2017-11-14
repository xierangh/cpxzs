/**
 * 联系我们
 */
import React from 'react'

import {
    View,
    Text,
    Clipboard,
    StyleSheet
}from 'react-native'

import Utils from './../Utils'
import styles from './../stylecpxzs'
import NavigatorTitle from './../comp/NavigatorTitle'
import Button from 'react-native-smart-button'


export default class ContactUs extends React.Component{

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
                    text={'联系我们'}>
                </NavigatorTitle>
                <View style={{marginVertical:40,marginHorizontal:20}}>
                    <Text>如果有需要帮助或问题，请联系客服人员。</Text>
                    <View style={{marginVertical:10}}>
                        <Text style={mystyle.text}>联系客服QQ:2878125716</Text>
                        <Button onPress={()=>this.copyno('2878125716')} style={mystyle.btn}>复制QQ号码</Button>
                    </View>
                    <View style={{marginVertical:10}}>
                        <Text style={mystyle.text}>联系客服QQ:2389363092</Text>
                        <Button onPress={()=>this.copyno('2389363092')} style={mystyle.btn}>复制QQ号码</Button>
                    </View>
                    <View style={{marginVertical:10}}>
                        <Text style={mystyle.text}>官方QQ群:377216961</Text>
                        <Button onPress={()=>this.copyno('377216961')} style={mystyle.btn}>复制QQ号码</Button>
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
    },
    btn:{
        borderWidth:1,
        borderRadius:6,
        borderColor:'#999',
        height:40,
        alignItems:'center',
        justifyContent:'space-around',
        marginTop:5
    }
})