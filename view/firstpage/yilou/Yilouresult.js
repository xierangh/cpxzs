import React from 'react'

import {
    View,
    StyleSheet,
    Text,
}from 'react-native'
import Utils from './../../Utils'
import styles from './../../stylecpxzs'
import YilouModel from './YilouModel'

import {observer} from 'mobx-react/native'

let model = new YilouModel();
@observer
export default class Yilouresult extends React.Component {

    render() {
        return (
            <View style={{marginTop:10}}>
                <View style={styles.splitLine}></View>
                <View style={mystyle.tabrow}>
                    <Text style={mystyle.tab_text}>当前遗漏期数</Text>
                    <View style={styles.splitLine_vertical}></View>
                    <Text style={mystyle.tab_value}>{model.result.currentOmissionCount}</Text>
                </View>
                <View style={styles.splitLine}></View>
                <View style={mystyle.tabrow}>
                    <Text style={mystyle.tab_text}>上次出现期数</Text>
                    <View style={styles.splitLine_vertical}></View>
                    <Text style={mystyle.tab_value}>{model.result.lastTimeAppearPeriod}</Text>
                </View>
                <View style={styles.splitLine}></View>
                <View style={mystyle.tabrow}>
                    <View style={mystyle.tab_col}>
                        <Text style={mystyle.tab_value}>{model.result.todayOmissionMaxCount}</Text>
                        <Text style={mystyle.tab_text}>今天最大遗漏期数</Text>
                    </View>
                    <View style={styles.splitLine_vertical}></View>
                    <View style={mystyle.tab_col}>
                        <Text style={mystyle.tab_value}>{model.result.todayAppearPeriod}</Text>
                        <Text style={mystyle.tab_text}>今天出现期数</Text>
                    </View>
                    <View style={styles.splitLine_vertical}></View>
                    <View style={mystyle.tab_col}>
                        <Text style={mystyle.tab_value}>{model.result.todayAppearCount}</Text>
                        <Text style={mystyle.tab_text}>今天出现次数</Text>
                    </View>
                </View>
                <View style={styles.splitLine}></View>
                <View style={mystyle.tabrow}>
                    <View style={mystyle.tab_col}>
                        <Text style={mystyle.tab_value}>{model.result.historyOmissionCount}</Text>
                        <Text style={mystyle.tab_text}>历史最大遗漏期数</Text>
                    </View>
                    <View style={styles.splitLine_vertical}></View>
                    <View style={mystyle.tab_col}>
                        <Text style={mystyle.tab_value}>{model.result.omissionDayCount}</Text>
                        <Text style={mystyle.tab_text}>历史最大遗漏天数</Text>
                    </View>
                    <View style={styles.splitLine_vertical}></View>
                    <View style={mystyle.tab_col}>
                        <Text style={mystyle.tab_value}>{model.result.threeMonthAppearCount}</Text>
                        <Text style={mystyle.tab_text}>历史出现次数</Text>
                    </View>
                </View>
                <View style={styles.splitLine}></View>
            </View>
        )
    }
}

const mystyle = StyleSheet.create({
    tabrow: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    tab_col:{
        flex:1,
    },
    tab_text: {
        textAlign: 'center',
        fontSize: Utils.FONT_SMALL,
        color: '#333',
        flex: 1,
    },
    tab_value: {
        textAlign: 'center',
        fontSize: Utils.FONT_NORMAL,
        color: '#ea5656',
        flex: 1,
        marginTop:2,
    },
})