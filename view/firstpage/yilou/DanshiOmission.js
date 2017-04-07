/**
 * 单式遗漏
 * 显示万千百十个
 * 输入部分
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

var allvalue = ['万','千','百','十','个'];

var numberinput='';
let model = new YilouModel();

export default class DanshiOmission extends React.Component{
    static propTypes={
        selected:React.PropTypes.array,
    }

    constructor(props){
        super(props)
    }

    getitems(){
        var items = [];
        for (var i in allvalue){
            var selected = false;
            var value = allvalue[i];
            for (var k in this.props.selected){
                if (value == this.props.selected[k]){
                    selected = true;
                    break;
                }
            }
            if (selected == true){
                items.push(<Text style={mystyle.icon_text_selected} key={i}>{value}</Text>);
            }else {
                items.push(<Text style={mystyle.icon_text} key={i}>{value}</Text>);
            }
        }
        return items;
    }

    onPress(){
        if (!numberinput){
            Utils.showAlert('','请输入您要统计的号码');
            return;
        }
        var numarr = numberinput.split(' ');
        var params='';
        params = params + 'number='+numarr.join(',');
        params = params + '&';
        params = params + 'wei='+model.subType.wei;
        params = params + '&';
        params = params + 'count=';

        model.doquery(params);
    }

    render(){
        return(
            <View style={{marginTop:5}}>
                <View style={mystyle.row}>
                    <Text style={mystyle.text_yilou}>遗漏位</Text>
                    {this.getitems()}
                </View>
                <View style={mystyle.inputview}>
                    <ScrollView
                        automaticallyAdjustContentInsets={false}
                        >
                        <TextInput
                            ref="number"
                            style={mystyle.inputtext}
                            multiline={true}
                            keyboardType="numeric"
                            placeholder={'请输入您要统计的号码'}
                            onChangeText={(text)=> numberinput = text}
                        />
                    </ScrollView>
                </View>
                <View style={mystyle.row}>
                    <Text style={mystyle.textinfo}>每注号码之间请用一个空格或英文逗号或英文分号隔开(输入的号码会自动排序并去除不合格号码)</Text>

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
        marginBottom:5,
    },
    icon_text_selected:{
        backgroundColor:'rgb(255,131,33)',
        padding:3,
        borderWidth:.5,
        borderRadius:4,
        borderColor:'rgb(255,131,33)',
        fontSize:Utils.FONT_SMALL,
        color:'#fff',
        marginHorizontal:3,
    },
    icon_text:{
        backgroundColor:'#fff',
        padding:3,
        borderWidth:.5,
        borderRadius:4,
        borderColor:'#333',
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