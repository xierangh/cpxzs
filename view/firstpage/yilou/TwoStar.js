/**
 * 二星遗漏
 */
import React from 'react'
import {
    View,
    StyleSheet,
    Text,
}from 'react-native'

import styles from './../../stylecpxzs'
import ButtonRowView from './../../comp/ButtonRowView';

import DanshiOmission from './DanshiOmission'
import FushiOmission from './FushiOmission'
import HezhiOmission from './HezhiOmission'
import DanmaOmission from './DanmaOmission'

import Yilouresult from './Yilouresult'
import YilouModel from './YilouModel'

let model = new YilouModel();

var items_types=[
    {name:'前二遗漏',value:1,wei:'wanQian',abc:'a,b',type:2,hezhi:'firstTwoSum',danma:'twoStarDanMaPrev',danshiwei:['万','千']},
    {name:'后二遗漏',value:2,wei:'shiGe',abc:'d,e',type:2,hezhi:'lastTwoSum',danma:'twoStarDanMaLast',danshiwei:['十','个']},
]

export default class TwoStar extends React.Component{
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
        model.subType = items_types[0];
    }

    onSelected(value){
        this.setState({omissonType:value})
        model.setOmissonType(value);
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
                        selected={this.state.omissonType}
                        onSelected={(value)=>this.onSelected(value)}
                        items={this.state.items}
                    />
                </View>
                <View style={mystyle.menu}>
                    <ButtonRowView
                        selected={this.state.subType}
                        onSelected={(value)=>this.onSelectedtype(value)}
                        items={this.state.items_types}
                    />
                </View>
                <View style={styles.splitLine}></View>
                <View style={mystyle.allview}>
                    {this.state.omissonType.value == 1 &&
                    <DanshiOmission
                        selected={this.state.subType.danshiwei}
                    />
                    }
                    {this.state.omissonType.value == 2 &&
                    <FushiOmission
                        selected={this.state.subType.danshiwei}
                    />
                    }
                    {this.state.omissonType.value == 3 &&
                    <HezhiOmission
                        selected={this.state.subType.danshiwei}
                    />
                    }
                    {this.state.omissonType.value == 4 &&
                    <DanmaOmission
                        selected={this.state.danshiwei}
                    />
                    }

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