/**
 * 定位胆遗漏的一行
 */

import React from 'react'
import {
    Text,
    View,
    StyleSheet,
} from 'react-native';

import Utils from './../../Utils'
import NotoolRowView from './../../comp/NotoolRowView';
import NotoolRowYiLouView from './../../comp/NotoolRowYiLouView';

export default class YilouRowView extends React.Component{

    static propTypes={
       currOmission:React.PropTypes.object,
       historyOmission:React.PropTypes.object,
       title:React.PropTypes.string,
    }

    getMaxIndex(){
        var index =-1;
        var max = -1;
        for(var i in this.props.currOmission.countList){
            if(this.props.currOmission.countList[i] > max){
                max = this.props.currOmission.countList[i];
                index = i;
            }
        }
        return index;
    }

    render(){
        return (
            <View>
                <View style={mystyle.row}>
                    <Text style={mystyle.row_text_tool}>{this.props.title}</Text>
                    <NotoolRowView
                    />
                </View>
                <View style={mystyle.row}>
                    <Text style={mystyle.row_text}>当前</Text>
                    <NotoolRowYiLouView
                        selected={this.props.currOmission.countList}
                    />
                </View>
                <View style={mystyle.row}>
                    <Text style={mystyle.row_text}>最大</Text>
                    <NotoolRowYiLouView
                        selected={this.props.historyOmission.countList}
                    />
                </View>
                <View style={mystyle.row}>
                    <Text style={mystyle.row_text_cold}>当前{this.props.title}冷号为:<Text style={mystyle.text_selected}>{this.getMaxIndex()}</Text></Text>
                    <Text style={mystyle.row_text_cold}>当前{this.props.title}走势为:<Text style={mystyle.text_selected}>{this.getMaxIndex()>4?'大':'小'} {this.getMaxIndex()%2==0?'双':'单'}</Text></Text>
                </View>
            </View>
        )
    }
}

const  mystyle = StyleSheet.create({

    row:{
        flexDirection:'row',
        justifyContent:'space-around',
    },
    row_text_tool:{
        textAlign:'left',
        fontSize:Utils.FONT_SMALL,
        marginLeft:10,
        marginTop:10,
        marginBottom:5,
    },
    row_text:{
        textAlign:'left',
        fontSize:Utils.FONT_SMALL,
        marginLeft:10,
        marginTop:6,
    },
    row_text_cold:{
        textAlign:'left',
        fontSize:Utils.FONT_SMALL,
        marginLeft:10,
        marginVertical:6,
    },
    text_selected:{
        fontSize:Utils.FONT_SMALL,
        marginVertical:6,
        color:'#ea5656'
    }

});