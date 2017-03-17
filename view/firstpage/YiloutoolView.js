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

import Utils from './../Utils'
import styles from './../stylecpxzs';
import NavigatorTitle from './../comp/NavigatorTitle';
import NotoolTimeViewOld from './../comp/NotoolTimeView';
import ButtonRowView from './../comp/ButtonRowView';
import Yiloudwd from './yilou/Yiloudwd'
import TwoStar from './yilou/TwoStar'



//列表数据准备
var ds = new ListView.DataSource({rowHasChanged: function(r1, r2):bool{
    return (r1 !== r2);
}})  // assumes immutable objects

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
            selectedValue:{name:'二星',value:4},
        }
    }

    onSelected(value){
        this.setState({selectedValue:value})
    }

    getShowView(){
        switch (this.state.selectedValue.value){
            case 1:
            case 2:
                return <View></View>
            case 3:
                return <Yiloudwd />
            case 4:
                return <TwoStar />
            case 5:
            case 6:
            case 7:
                return <View></View>
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
                <View style={{height:30}}>
                    <ButtonRowView
                        selected={this.state.selectedValue}
                        onSelected={(value)=>this.onSelected(value)}
                        items={this.state.items}
                    />
                </View>

                <View style={styles.splitLine}></View>
                <ScrollView
                    automaticallyAdjustContentInsets={false}>
                    {this.getShowView()}
                </ScrollView>
                <View style={styles.splitLine}></View>
            </View>
        );
    }
}



