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
import moment from 'moment'

import AppEventListenerEnhance from 'react-native-smart-app-event-listener-enhance'
// import Button from 'react-native-smart-button'
import AliPay from 'react-native-smart-alipay'


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
            url:'',
        }

        this._xhr = null;

    }

    componentWillMount () {
        this.addAppEventListener(
            NativeAppEventEmitter.addListener('alipay.mobile.securitypay.pay.onPaymentResult', (result)=>{
                //console.log(`result -> `)
                //console.log(result)
                console.log(`result.resultStatus = ${result.resultStatus}`)
                console.log(`result.memo = ${result.memo}`)
                console.log(`result.result = ${result.result}`)
                this._button_alipay.setState({
                    loading: false,
                })
                Utils.showAlert(
                    '',
                    `${result.resultStatus == 9000 ? '支付成功' : '支付失败'} `
                )
            }) //alipay
        )
    }

    _getAlipayParams() {
        this._button_alipay.setState({
            loading: true,
        })

        //http请求服务获取支付参数及RSA数字签名信息
        this._xhr && this._xhr.abort()

        var xhr = this._xhr || new XMLHttpRequest()
        this._xhr = xhr

        xhr.onerror = ()=> {
            this._button_alipay.setState({
                loading: false,
            })
            console.log(`状态码: ${xhr.status}, 错误信息: ${xhr.responseText}`);
            Utils.showAlert(
                '请求出错',
                `状态码: ${xhr.status}, 错误信息: ${xhr.responseText}`
            )
        }

        xhr.ontimeout = () => {
            this._button_alipay.setState({
                loading: false,
            })
            Utils.showAlert(
                '',
                '请求超时'
            )
        }

        //TODO.
        //let server_api_url = '获取支付宝参数信息的服务器接口url地址'
        //let params = '提交的参数, 例如订单号信息'
        //let appScheme = 'ios对应URL Types中的URL Schemes的值, 会影响支付成功后是否能正确的返回app'
        let server_api_url = 'http://f154876m19.imwork.net:16374/nAdvanceOrder/payAli'  //内部测试地址, 需自行修改
        let params = 'oid=3428a92f55bff7920155c2e4cc790060' //提交参数, 需自行修改
        let appScheme = 'reactnativecomponent'

        xhr.open('POST', server_api_url)
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhr.onload = () => {
            if (xhr.status !== 200) {
                this._button_alipay.setState({
                    isPress: false,
                })
                Utils.showAlert(
                    '请求失败',
                    `HTTP状态码: ${xhr.status}`
                )
                return
            }
            if (!xhr.responseText) {
                this._button_alipay.setState({
                    isPress: false,
                })
                Utils.showAlert(
                    '请求失败',
                    '没有返回信息'
                )
                return
            }
            let responseJSON = JSON.parse(xhr.responseText)
            let orderText = decodeURIComponent(responseJSON.result)
            console.log(`响应信息: ${xhr.responseText}`)
            /*
             * 服务端获取支付宝SDK快捷支付功能所需参数字串示例(对应下面的orderText)
             * partner="2088021133166364"&seller_id="koa@sh-defan.net"&out_trade_no="160707414842102"&subject="到途订单-160707414842102"&body="营养快线水果酸奶饮品（椰子味）,500ml,4;正宗凉茶,310ML,4;原味味奶茶,80g,6;"&total_fee="0.01"&notify_url="http://f154876m19.imwork.net:16374/pay/paymentCompletion"&service="mobile.securitypay.pay"&payment_type="1"&_input_charset="utf-8"&it_b_pay="-644885m"&return_url="m.alipay.com"&sign="iW5aK2dEsIj8nGg%2BEOOlMcyL081oX%2F2zHNcoJRrlO3qWmoVkXJM%2B2cHH9rSDyGYAeKxRD%2BYwrZK3H3QYb%2Fxi6Jl%2BxJVcvguluXbKvmpKjuuBv2gcOyqtydUMHwpdAVN%2BTwbQ6Zt8LU9xLweua7n%2FLuTFdjyePwf5Zb72r21v5dw%3D"&sign_type="RSA"
             */
            console.log(`获取支付宝参数成功, decodeURIComponent -> orderText = ${orderText}`);
            AliPay.payOrder({
                orderText,
                appScheme,
            });

        }

        xhr.timeout = 30000
        xhr.send(params)
    }

    reCharge() {
        // rechargeAmount:28.50
        // vipType:4
        // monthCount:1
        // startTime:2017-03-28
        // endTime:2017-03-31
        // payType:1
        var url = 'http://shoujiapp.cpxzs.com/order?'
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

        url = url + param;

        // Linking.openURL(url)
        // .catch((err)=>{
        //     console.log('An error occurred', err);
        // });
        this._getAlipayParams();
    }

    vipchange(option){
        var index = option.key;
        var paymonth = this.state.paymonth;
        switch (index){
            case 4:
                paymonth = 28.5;
                break;
            case 2:
                paymonth = 95.00;
                break;
            case 3:
                paymonth = 190.00;
                break;
            case 5:
                paymonth = 200.00;
                break;
        }
        // Utils.showAlert('',paymonth+'');
        var endtimestr = Utils.userInfo.memberEndTime;
        var time = null;
        if (!endtimestr){
            time = moment();
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
            pay:index == '4' ? 28.5 : paymonth*this.state.month.key,
            timestart:timestr,
            timeend:this.timeformat(time),
        });
    }

    timeformat(time){
        return time.format('YYYY-MM-DD');
    }

    monthchange(option){
        var index = option.key;
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