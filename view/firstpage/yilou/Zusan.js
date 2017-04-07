/**
 * 组三遗漏
 */
import React from 'react'
import {
    View,
    StyleSheet,
    Text,
}from 'react-native'

import styles from './../../stylecpxzs'
import ButtonRowView from './../../comp/ButtonRowView';

import DanmaOmission from './DanmaOmission'

import Yilouresult from './Yilouresult'
import YilouModel from './YilouModel'

let model = new YilouModel();

var items_types=[
    {name:'前三',value:1,danma:'patternThreePrev'},
    {name:'中三',value:2,danma:'patternThreeMid'},
    {name:'后三',value:3,danma:'patternThreeLast'},
]

export default class Zusan extends React.Component{
    static propTypes={
        items:React.PropTypes.array
    }
    constructor(props){
        super(props)
        this.state={
            items:this.props.items,
            omissonType:this.props.items[0],
            items_types:items_types,
            subType:items_types[0],
        }
        model.omissonType = this.props.items[0];
        model.subType = items_types[0];
    }

    onSelectedtype(value){
        this.setState({
            subType:value,
        })
        model.setSubType(value);
    }

    render(){
        return(
            <View style={mystyle.row_bottom}>
                <View style={mystyle.menu}>
                    <ButtonRowView
                        selected={this.state.subType}
                        onSelected={(value)=>this.onSelectedtype(value)}
                        items={this.state.items_types}
                    />
                </View>

                <View style={styles.splitLine}></View>
                <View style={mystyle.allview}>
                    <DanmaOmission least="请至少选择两个数字" number={2}/>
                    <Yilouresult />
                </View>
            </View>
        )
    }
}

const  mystyle = StyleSheet.create({
    allview:{
        marginHorizontal:10,
    },
    row:{
        flexDirection:'row',
        alignItems:'center',
        paddingVertical:3,
    },
    row_bottom:{
        marginBottom:30,
    },
    menu:{
        height:40,
    }
});