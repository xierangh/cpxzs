/**
 * Created by lenovo on 2017/3/8.
 * VipchargeView 账户充值
 */
import React from 'react';
import {
    View,
    Text,
    Picker,
    StyleSheet,
    Image,
    Platform,
    ScrollView,
    TouchableHighlight,
}from 'react-native'

import Utils from './../Utils'
import styles from './../stylecpxzs'
import CustomButton from './../comp/CustomButton'
import NavigatorTitle from './../comp/NavigatorTitle'
import moment from 'moment'

export default class VipchargeView extends React.Component{
    constructor(props){
        super(props)

        var endtimestr = Utils.userInfo.memberEndTime;
        var time = null;
        if (!endtimestr){
            time = moment();
        }else{
            time = moment(endtimestr,'YYYY-MM-DD HH:mm:ss');
        }
        var timestr = this.timeformat(time);
        time.add(1,'M');
        this.state={
            vip:1,
            month:1,
            pay:95.00,
            timestr:timestr+'—'+this.timeformat(time),
            paymonth:95.00,
            payway:1,//1-支付宝,2-微信
        }

    }

    reCharge(){

    }

    vipchange(index){
        var paymonth = this.state.paymonth;
        switch (index){
            case '1':
                paymonth = 28.5;
                break;
            case '2':
                paymonth = 95.00;
                break;
            case '3':
                paymonth = 190.00;
                break;
            case '4':
                paymonth = 200.00;
                break;
        }
        Utils.showAlert('',paymonth+'');
        this.setState({
            paymonth:paymonth,
            vip: index,
            pay:paymonth*this.state.month
        });
    }
    timeformat(time){
        return time.format('YYYY-MM-DD');
    }
    monthchange(index){
        var endtimestr = Utils.userInfo.memberEndTime;
        var time = null;
        if (!endtimestr){
            time = moment();
        }else{
            time = moment(endtimestr,'YYYY-MM-DD HH:mm:ss');
        }
        var timestr = this.timeformat(time);
        time.add(index,'M');
        this.setState({
            month: index,
            pay:index*this.state.paymonth,
            timestr:timestr+'—'+this.timeformat(time),
        });
    }
    render(){
        return (
        <View style={styles.container}>
            <NavigatorTitle
                onPress={()=>this.props.navigator.pop()}
                text={'账户充值'}>
            </NavigatorTitle>
            <ScrollView
                style={{backgroundColor:'#eee',paddingBottom:50}}
                automaticallyAdjustContentInsets={false}>

            <View style={mystyle.row}>
                <Text style={mystyle.text}>请选择充值会员类型</Text>
                <Picker
                    style={styles.picker_view}
                    selectedValue={this.state.vip}
                    onValueChange={(index) => this.vipchange(index)}>
                    <Picker.Item label="试用VIP" value="1" />
                    <Picker.Item label="VIP" value="2" />
                    <Picker.Item label="SVIP" value="3" />
                    <Picker.Item label="共享VIP" value="4" />
                </Picker>
            </View>
            <View style={styles.splitLine}></View>
            <View style={mystyle.row}>
                <Text style={mystyle.text}>请选择充值会员时长</Text>
                <Picker
                    style={styles.picker_view}
                    selectedValue={this.state.month}
                    onValueChange={(value) => this.monthchange(value)}>
                    <Picker.Item label="一个月[9.5折]" value="1" />
                    <Picker.Item label="二个月[9.5折]" value="2" />
                    <Picker.Item label="三个月[9.5折]" value="3" />
                    <Picker.Item label="六个月[9.5折]" value="6" />
                    <Picker.Item label="十二个月[9.5折]" value="12" />
                </Picker>
            </View>
            <View style={styles.splitLine}></View>
            <View style={mystyle.row_padding}>
                <Text style={mystyle.text}>会员起止时间</Text>
                <Text style={mystyle.text}>{this.state.timestr}</Text>
            </View>
            <View style={[styles.splitLine,{marginTop:10*Utils.scale}]}></View>
            <View style={mystyle.row_padding}>
                <Text style={mystyle.text}>请选择充值方式</Text>
            </View>
            <View style={styles.splitLine}></View>
            <TouchableHighlight
                underlayColor={'#fff1'}
                onPress={()=>this.setState({payway:1})}
                >
                <View style={mystyle.row_padding}>
                    <Image source={require('./../ico/wxpay.png')} style={styles.image}></Image>
                    <Text style={mystyle.text}>支付宝支付</Text>
                    {this.state.payway == 1 &&
                    <Image source={require('./../ico/ok_gou.png')} style={styles.image}></Image>
                    }
                </View>
            </TouchableHighlight>
            <View style={styles.splitLine}></View>
            <TouchableHighlight
                underlayColor={'#fff1'}
                onPress={()=>this.setState({payway:2})}
                >
                <View style={mystyle.row_padding}>
                    <Image source={require('./../ico/alipay.png')} style={styles.image}></Image>
                    <Text style={mystyle.text}>微信支付</Text>
                    {this.state.payway == 2 &&
                    <Image source={require('./../ico/ok_gou.png')} style={styles.image}></Image>
                    }
                </View>
            </TouchableHighlight>

            <View style={styles.splitLine}></View>
            <View style={mystyle.row_padding}>
                <Text style={mystyle.text_total}>优惠价:￥{this.state.pay}</Text>
            </View>

            <CustomButton
                ref='rechageBtn'
                onPress={()=>this.reCharge()}
                text={'立即充值'}
            />
            <View style={styles.space}></View>
            </ScrollView>
        </View>
        );
    }
}


const  mystyle = StyleSheet.create({
    row:{
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:10,
        backgroundColor:'#fff'
    },
    row_padding:{
        flexDirection:'row',
        alignItems:'center',
        paddingVertical:10*Utils.scale,
        paddingHorizontal:10,
        backgroundColor:'#fff'
    },
    text:{
        fontSize:Utils.FONT_NORMAL,
        flex:1,
    },
    text_total:{
        fontSize:Utils.FONT_BIG_SUB,
        flex:1,
        textAlign:'center',
        color:'#ea5656'
    },
});