/**
 * 和值遗漏
 * 选择和值
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

import NotoolRowView from './../../comp/NotoolRowView'


let model = new YilouModel();

export default class HezhiOmission extends React.Component{
    static propTypes={
        selected:React.PropTypes.array,
    }

    constructor(props){
        super(props)
    }

    onPress(){

        var hezhi = this.refs.hezhi.getSelected();
        //type:2&numberArr:2,4,;,2,3,4&wei:a,b&cond:wanQian&count:
        if (hezhi.length == 0 ){
            Utils.showAlert('','请至少选中一个数字');
            return;
        }

        var params='';
        params = params + 'numberArr='+hezhi.join(',');
        params = params + '&';
        params = params + 'type='+model.subType.hezhi;
        params = params + '&';
        params = params + 'count=';

        model.doquery(params);
    }

    render(){
        var maxnum = this.props.selected.length*9;
        return(
            <View>
                <NotoolRowView
                    ref="hezhi"
                    maxNum={maxnum}
                />

                <View style={mystyle.row}>
                    <Text style={mystyle.textinfo}>使用方法:从上面号码中选择一个或者多个进行遗漏统计</Text>

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