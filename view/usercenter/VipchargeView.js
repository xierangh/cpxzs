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
    Linking,
    NativeAppEventEmitter
}from 'react-native'

import Utils from './../Utils'
import styles from './../stylecpxzs'
import CustomButton from './../comp/CustomButton'
import NavigatorTitle from './../comp/NavigatorTitle'
import ModalPicker from './../picker/ModalPicker'
import AliPayView from './AliPayView'
import moment from 'moment'

import AppEventListenerEnhance from 'react-native-smart-app-event-listener-enhance'
// import Button from 'react-native-smart-button'
import * as WechatAPI from 'react-native-wx';

const vipdata=[
    { key: 4, section: true, label: '试用VIP' },
    { key: 2, label: 'VIP' },
    { key: 3, label: 'SVIP' },
    { key: 5, label: '共享VIP' },
]

const monthdata=[
    { key: 1, section: true, label: '一个月[9.5折]' },
    { key: 2, label: '二个月[9.5折]' },
    { key: 3, label: '三个月[9.5折]' },
    { key: 6, label: '六个月[9.5折]' },
    { key: 12, label: '十二个月[9.5折]' },
];
class VipchargeView extends React.Component{
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
        time.add(3,'d');
        this.state={
            vip:vipdata[0],
            month:monthdata[0],
            pay:28.5,
            timestart:timestr,
            timeend:this.timeformat(time),
            paymonth:28.50,
            payway:1,//1-支付宝,2-微信
            paysetting:{},
        }

        this._xhr = null;

    }

    componentWillMount () {

        this.getPaysetting();
    }

    getPaysetting(){
        Utils.getWithParams('order/appLoadUserPayData','')
            .then((data)=>{
                console.log(JSON.stringify(data));
                this.setState({
                    paysetting:data,
                    pay:data['trialVipCosts']*data['trialVipDiscount']/10.0,
                })
            })
    }

    reCharge() {
        // rechargeAmount:28.50
        // vipType:4
        // monthCount:1
        // startTime:2017-03-28
        // endTime:2017-03-31
        // payType:1
        var param = '';
        param = param + 'rechargeAmount=' + this.state.pay;
        param = param + '&';
        param = param + 'vipType=' + this.state.vip.key;
        param = param + '&';
        param = param + 'monthCount=' + this.state.month.key;
        param = param + '&';
        param = param + 'startTime=' + this.state.timestart;
        param = param + '&';
        param = param + 'endTime=' + this.state.timeend;
        param = param + '&';
        param = param + 'payType=' + this.state.payway;

        Utils.post('order/doOrder',param)
            .then((data)=>{
                console.log(JSON.stringify(data));
                // Linking.openURL(data.buildHtmlResult)
                // .catch((err)=>{
                //     console.log('An error occurred', err);
                // });
                if (this.state.payway == 1)
                    this.alipay(data['buildHtmlResult']);
                if (this.state.payway == 2)
                    this.wxpay(data['wxpay']);
                this._button_alipay.setPressed(false);
            })
        // this._getAlipayParams();
    }

    wxpay(data){
        WechatAPI.pay(data);
    }
    alipay(data){
        var orderText = decodeURIComponent(data);
        console.log(orderText);
        // var appscheme = this.state.paysetting['payDispatcherDomain'];
        // AliPay.payOrder({
        //     orderText,
        //     appscheme
        // });
        var html = `<script src="http://cdn.hcharts.cn/jquery/jquery-1.8.3.min.js"></script><div>${orderText}</div>`+
                `<script>$('#alipaysubmit').submit();</script>`;
        this.props.navigator.push({
            navigationBarHidden:true,
            component:AliPayView,
            passProps:{
                form:html
            }
        });
    }

    setVipselect(index){
        for (var i in vipdata){
            if(vipdata[i].key == index){
                vipdata[i].section = true;
            }else {
                vipdata[i].section = false;
            }
        }
    }
    vipchange(option){
        var index = option.key;
        var paymonth = this.state.paymonth;
        var discount =this.state.paysetting['vipDiscount']
        switch (index){
            case 4:
                paymonth = this.state.paysetting['trialVipCosts'];
                discount =this.state.paysetting['trialVipDiscount'];
                break;
            case 2:
                paymonth = this.state.paysetting['vipCosts'];
                discount =this.state.paysetting['vipDiscount'];
                break;
            case 3:
                paymonth = this.state.paysetting['svipCosts'];
                discount =this.state.paysetting['svipDiscount'];
                break;
            case 5:
                paymonth = this.state.paysetting['shareVipCosts'];
                discount =this.state.paysetting['shareVipDiscount'];
                break;
        }
        this.setVipselect(index);
        // Utils.showAlert('',paymonth+'');
        var endtimestr = Utils.userInfo.memberEndTime;
        var time = null;
        if (!endtimestr){
            time = moment(this.state.paysetting['nowTime'],'YYYY-MM-DD');
        }else{
            time = moment(endtimestr,'YYYY-MM-DD HH:mm:ss');
        }
        var timestr = this.timeformat(time);
        if(index == '4'){
            time.add(3,'d');
        }else{
            time.add(this.state.month.key,'M');
        }

        this.setState({
            paymonth:paymonth,
            vip: option,
            pay:index == '4' ? this.state.paysetting['trialVipCosts']*this.state.paysetting['trialVipDiscount']/10.0 : paymonth*this.state.month.key*discount/10.0,
            timestart:timestr,
            timeend:this.timeformat(time),
        });
    }

    timeformat(time){
        return time.format('YYYY-MM-DD');
    }

    setMonthselect(index){
        for (var i in monthdata){
            if(monthdata[i].key == index){
                monthdata[i].section = true;
            }else {
                monthdata[i].section = false;
            }
        }
    }

    monthchange(option){
        var index = option.key;
        this.setMonthselect(index);

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
            month: option,
            pay:index*this.state.paymonth,
            timestart:timestr,
            timeend:this.timeformat(time),
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
                <View style={styles.picker_view}>
                    <ModalPicker
                        data={vipdata}
                        initValue={this.state.vip.label}
                        onChange={(option)=>{ this.vipchange(option);}} />
                </View>
            </View>
            <View style={styles.splitLine}></View>
            <View style={mystyle.row}>
                <Text style={mystyle.text}>请选择充值会员时长</Text>
                {this.state.vip.key==4 ?
                    <Text style={mystyle.text}>3天[9.5折]</Text>
                    :
                    <View style={styles.picker_view}>
                        <ModalPicker
                            data={monthdata}
                            initValue={this.state.month.label}
                            onChange={(option)=>{ this.monthchange(option);}} />
                    </View>
                }
            </View>
            <View style={styles.splitLine}></View>
            <View style={mystyle.row_padding}>
                <Text style={mystyle.text}>会员起止时间</Text>
                <Text style={mystyle.text}>{this.state.timestart}—{this.state.timeend}</Text>
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
                    <Image source={require('./../ico/alipay.png')} style={styles.image}></Image>
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
                    <Image source={require('./../ico/wxpay.png')} style={styles.image}></Image>
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
                ref={component => this._button_alipay = component}
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
        paddingVertical:10*Utils.scale,
        flex:1,
    },
    text_total:{
        fontSize:Utils.FONT_BIG_SUB,
        flex:1,
        textAlign:'center',
        color:'#ea5656'
    },
});


export default AppEventListenerEnhance(VipchargeView)