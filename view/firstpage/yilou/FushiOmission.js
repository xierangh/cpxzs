/**
 * 复式遗漏
 * 显示选择号码(对应个十百千万)
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
import styles from './../../stylecpxzs';
import Button from 'react-native-smart-button'
import YilouModel from './YilouModel'

import NotoolRowViewPlus from './../../comp/NotoolRowViewPlus'


let model = new YilouModel();

export default class DanshiOmission extends React.Component{
    static propTypes={
        selected:React.PropTypes.array,
    }

    constructor(props){
        super(props)
    }

    onPress(){

        var w0 = this.refs.w0.getSelected();
        var w1 = this.refs.w1.getSelected();
        if (w0.length == 0 && w1.length==0){
            Utils.showAlert('','每位至少选中一个数字');
            return;
        }
        var numarr=[];
        numarr.push(w0.join(','));
        numarr.push(w1.join(','));
        if(this.props.selected.length > 2){
            var w2 = this.refs.w2.getSelected();
            if (w2.length == 0){
                Utils.showAlert('','每位至少选中一个数字');
                return;
            }
            numarr.push(w2.join(','));
        }
        if(this.props.selected.length > 3){
            var w3 = this.refs.w3.getSelected();
            if (w3.length == 0){
                Utils.showAlert('','每位至少选中一个数字');
                return;
            }
            numarr.push(w3.join(','));
        }
        if(this.props.selected.length > 4){
            var w4 = this.refs.w4.getSelected();
            if (w4.length == 0){
                Utils.showAlert('','每位至少选中一个数字');
                return;
            }
            numarr.push(w4.join(','));
        }

        var params='';
        params = params + 'numberArr='+numarr.join(';');
        params = params + '&';
        params = params + 'cond='+model.subType.wei;
        params = params + '&';
        params = params + 'wei='+model.subType.abc;
        params = params + '&';
        params = params + 'type='+model.subType.type;
        params = params + '&';
        params = params + 'count=';

        model.doquery(params);
    }

    render(){
        var cols = [];
        for (var i in this.props.selected){
            var refstr = 'w'+i;
            var titlestr = this.props.selected[i]+'位';
            cols.push(<NotoolRowViewPlus
                ref={refstr}
                title={titlestr}
                key={i}
            />);
            cols.push(<View style={styles.splitLine_l}></View>);
        }
        return(
            <View>
                {cols}

                <View style={mystyle.row}>
                    <Text style={mystyle.textinfo}>从十位、个位选取一个或多个号码或者使用右边全、大、小、单、双按钮进行选号</Text>

                    <Button
                        textStyle={{textAlign:'center',color:'#fff',fontSize:Utils.FONT_NORMAL_SUB,fontWeight:'normal'}}
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