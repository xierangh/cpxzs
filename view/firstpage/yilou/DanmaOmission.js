/**
 * 胆码遗漏
 *
 */
import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    TextInput
}from 'react-native'

import Utils from './../../Utils';
import Button from 'react-native-smart-button'
import YilouModel from './YilouModel'

import NotoolRowViewPlus from './../../comp/NotoolRowViewPlus'


let model = new YilouModel();

export default class DanmaOmission extends React.Component{
    static propTypes={
        selected:React.PropTypes.array,
        least:React.PropTypes.string,
        number:React.PropTypes.number
    }

    constructor(props){
        super(props)
    }

    onPress(){

        var danma = this.refs.danma.getSelected();
        //type:2&numberArr:2,4,;,2,3,4&wei:a,b&cond:wanQian&count:
        if (this.props.least){
            if (danma.length < this.props.number){
                Utils.showAlert('',this.props.least);
                return;
            }
        }else{
            if (danma.length == 0){
                Utils.showAlert('','至少选中一个数字');
                return;
            }
        }

        var params='';
        params = params + 'numberArr='+danma.join(',');
        params = params + '&';
        params = params + 'type='+model.subType.danma;
        params = params + '&';
        params = params + 'count=';

        model.doquery(params);
    }

    render(){
        return(
            <View>
                <NotoolRowViewPlus
                    ref="danma"
                    title={'号码'}
                />

                <View style={mystyle.row}>
                    <Text style={mystyle.textinfo}>使用方法:从号码选取一个或多个号码或者使用右边全、大、小、单、双按钮进行选号</Text>

                    <Button
                        textStyle={{textAlign:'center',color:'#fff',fontSize:Utils.FONT_NORMAL}}
                        style={{backgroundColor:'#ffaf48',borderRadius:3,width:66,height:30,borderWidth:1,borderColor:'#ffaf48',justifyContent:'center',marginLeft:1,marginTop:1}}
                        onPress={() => this.onPress()}>遗漏统计</Button>
                </View>
            </View>
        )
    }
}

const  mystyle = StyleSheet.create({
    row:{
        flexDirection:'row',
        alignItems:'center',
        paddingVertical:3,
    },
    icon_text_selected:{
        backgroundColor:'rgb(255,131,33)',
        padding:3,
        borderWidth:.5,
        borderRadius:4,
        borderColor:'#666',
        fontSize:Utils.FONT_SMALL,
        color:'#fff',
        marginHorizontal:3,
    },
    icon_text:{
        backgroundColor:'#fff',
        padding:3,
        borderWidth:.5,
        borderRadius:4,
        borderColor:'#ccc',
        fontSize:Utils.FONT_SMALL,
        marginHorizontal:3,
    },
    text_yilou:{
        fontSize:Utils.FONT_NORMAL,
        color:'#ea5656',
    },
    inputview:{
        height:100*Utils.scale,
        borderWidth:.5,
        borderRadius:4,
        borderColor:'#ccc',
        padding:3
    },
    inputtext:{
        flex:1,
        height:200,
    },
    textinfo:{
        fontSize:Utils.FONT_SMALL,
        flex:6,
        color:'#999',
    },
});