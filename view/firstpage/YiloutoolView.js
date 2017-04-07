/**
 * 遗漏助手
 */

import React from 'react';
import {
    Text,
    ListView,
    View,
    TouchableHighlight,
    StyleSheet,
    ScrollView
} from 'react-native';

import styles from './../stylecpxzs';
import NavigatorTitle from './../comp/NavigatorTitle';
import NotoolTimeViewOld from './../comp/NotoolTimeView';
import ButtonRowView from './../comp/ButtonRowView';
import Yiloudwd from './yilou/Yiloudwd'
import TwoStar from './yilou/TwoStar'
import ThreeStar from './yilou/ThreeStar'
import FourStar from './yilou/FourStar'
import FiveStar from './yilou/FiveStar'

import Zuliu from './yilou/Zuliu'
import Zusan from './yilou/Zusan'
import YilouModel from './yilou/YilouModel'



var yilou_items=[
    {name:'单式遗漏',value:1,url:'omission/omissionHistoryQuery'},
    {name:'复式遗漏',value:2,url:'omission/compoundOmissionQuery'},//type:2&numberArr:2,4,;,2,3,4&wei:a,b&cond:wanQian&count:
    {name:'和值遗漏',value:3,url:'omission/sumValueOmission'},//type=firstTwoSum&numberArr=2,4,8&count=
    {name:'胆码遗漏',value:4,url:'omission/danMaOmission'},//type=twoStarDanMaPrev&numberArr=4,6,7,8&count=
    ];

var yilou_pattern=[
    {name:'组选',value:1,url:'omission/patternOmission'},
];
let model = new YilouModel();

export default class YiloutoolView extends React.Component{

    constructor(props){
        super(props)
        this.state={
            loaded:true,
            items:[
                {name:'组三',value:1},
                {name:'组六',value:2},
                {name:'定位胆',value:3},
                {name:'二星',value:4},
                {name:'三星',value:5},
                {name:'四星',value:6},
                {name:'五星',value:7},
            ],
            selectedValue:{name:'定位胆',value:3},
        }
    }

    onSelected(value){
        this.setState({selectedValue:value})
        model.setResultEmpty();
    }

    getShowView(){
        switch (this.state.selectedValue.value){
            case 1:
                return <Zusan items={yilou_pattern}/>
            case 2:
                return <Zuliu items={yilou_pattern}/>
            case 3:
                return <Yiloudwd />
            case 4:
                return <TwoStar items={yilou_items} />
            case 5:
                return <ThreeStar items={yilou_items} />
            case 6:
                return <FourStar items={yilou_items}/>
            case 7:
                return <FiveStar items={yilou_items}/>
        }
    }

    render(){

        return(
            <View style={styles.container}>
                <NavigatorTitle
                    onPress={()=>this.props.navigator.pop()}
                    text={'遗漏助手'}>
                </NavigatorTitle>

                <NotoolTimeViewOld
                    ref='timeview'
                />
                <View style={styles.splitLine}></View>
                <View style={{height:40}}>
                    <ButtonRowView
                        selected={this.state.selectedValue}
                        onSelected={(value)=>this.onSelected(value)}
                        items={this.state.items}
                    />
                </View>

                <View style={styles.splitLine_l}></View>
                <ScrollView
                    automaticallyAdjustContentInsets={false}>
                    {this.getShowView()}
                </ScrollView>
                <View style={styles.splitLine}></View>
            </View>
        );
    }
}



