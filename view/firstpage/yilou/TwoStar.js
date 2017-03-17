import React from 'react'
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    TextInput,
    TouchableHighlight
}from 'react-native'

import Utils from './../../Utils'
import styles from './../../stylecpxzs'
import ButtonRowView from './../../comp/ButtonRowView';

var numberinput='';
export default class TwoStar extends React.Component{
    constructor(props){
        super(props)
        this.state={
            items:[
                {name:'单式遗漏',value:1},
                {name:'复式遗漏',value:2},
                {name:'和值遗漏',value:3},
                {name:'胆码遗漏',value:4},
            ],
            selectedValue:{name:'单式遗漏',value:1,url:'omission/omissionHistoryQuery'},

            items_type:[
                {name:'前二遗漏',value:1},
                {name:'后二遗漏',value:2},
            ],
            selectedType:{name:'前二遗漏',value:1,type:'wanQian'},
            result:{"todayAppearCount":0,"historyOmissionCount":0,"todayAppearPeriod":"","threeMonthAppearCount":0,"todayOmissionMaxCount":0,
                "lastTimeAppearPeriod":"","omissionDayCount":0,"averangeAppearPercent":"0","currentOmissionCount":0,"success":true},
        }

    }

    onSelected(value){
        this.setState({selectedValue:this.state.items[value]})
    }

    onSelectedtype(value){
        this.setState({selectedValue:this.state.items[value]})
    }

    onPress(){
        this.queryOmission();
    }

    queryOmission(){
        var numarr = numberinput.split(' ');
        var params='';
        params = params + 'number='+numarr.join(',');
        params = params + '&';
        params = params + 'wei='+this.state.selectedType.type;
        params = params + '&';
        params = params + 'count=';
        Utils.getWithParams(this.state.selectedValue.url,params)
            .then((data)=>{
                if(!data){
                    return;
                }
                console.log(JSON.stringify(data));
                this.setState({
                    result:data,
                })
            })
    }
    render(){
        return(
            <View style={mystyle.row_bottom}>
                <View style={mystyle.menu}>
                    <ButtonRowView
                        selected={this.state.selectedValue}
                        onSelected={(value)=>this.onSelected(value)}
                        items={this.state.items}
                    />
                </View>
                <View style={mystyle.menu}>
                    <ButtonRowView
                        selected={this.state.selectedType}
                        onSelected={(value)=>this.onSelectedtype(value)}
                        items={this.state.items_type}
                    />
                </View>
                <View style={styles.splitLine}></View>
                <View style={mystyle.allview}>
                    <View style={mystyle.row}>
                        <Text style={mystyle.text_yilou}>遗漏位</Text>
                        <View style={mystyle.row}>
                            <Text style={mystyle.icon_text_selected}>万</Text>
                            <Text style={mystyle.icon_text_selected}>千</Text>
                            <Text style={mystyle.icon_text}>百</Text>
                            <Text style={mystyle.icon_text}>十</Text>
                            <Text style={mystyle.icon_text}>个</Text>
                        </View>
                    </View>
                    <View style={mystyle.inputview}>
                        <ScrollView
                            automaticallyAdjustContentInsets={false}
                            >
                            <TextInput
                                ref="number"
                                style={mystyle.inputtext}
                                multiline={true}
                                placeholder={'请输入您要统计的号码'}
                                onChangeText={(text)=> numberinput = text}
                                />
                        </ScrollView>
                    </View>
                    <View style={mystyle.row}>
                        <Text style={mystyle.textinfo}>每注号码之间请用一个空格或英文逗号或英文分号隔开(输入的号码会自动排序并去除不合格号码)</Text>
                        <TouchableHighlight
                            underlayColor={'#0002'}
                            onPress={() => this.onPress()}>
                            <View style={{backgroundColor:'#ffaf48',borderRadius:3,width:66,height:30,borderWidth:1,borderColor:'#ffaf48',justifyContent:'center',marginLeft:1,marginTop:1}}>
                                <Text style={{textAlign:'center',color:'#fff'}}>遗漏统计</Text>
                            </View>
                        </TouchableHighlight>
                    </View>

                    <View style={styles.splitLine}></View>
                    <View style={mystyle.tabrow}>
                        <Text style={mystyle.tab_text}>当前遗漏期数</Text>
                        <View style={styles.splitLine_vertical}></View>
                        <Text style={mystyle.tab_value}>{this.state.result.currentOmissionCount}</Text>
                    </View>
                    <View style={styles.splitLine}></View>
                    <View style={mystyle.tabrow}>
                        <Text style={mystyle.tab_text}>上次出现期数</Text>
                        <View style={styles.splitLine_vertical}></View>
                        <Text style={mystyle.tab_value}>{this.state.result.lastTimeAppearPeriod}</Text>
                    </View>
                    <View style={styles.splitLine}></View>
                    <View style={mystyle.tabrow}>
                        <View>
                            <Text style={mystyle.tab_value}>{this.state.result.todayOmissionMaxCount}</Text>
                            <Text style={mystyle.tab_text}>今天最大遗漏期数</Text>
                        </View>
                        <View style={styles.splitLine_vertical}></View>
                        <View>
                            <Text style={mystyle.tab_value}>{this.state.result.todayAppearPeriod}</Text>
                            <Text style={mystyle.tab_text}>今天出现期数</Text>
                        </View>
                        <View style={styles.splitLine_vertical}></View>
                        <View>
                            <Text style={mystyle.tab_value}>{this.state.result.todayAppearCount}</Text>
                            <Text style={mystyle.tab_text}>今天出现次数</Text>
                        </View>
                    </View>
                    <View style={styles.splitLine}></View>
                    <View style={mystyle.tabrow}>
                        <View>
                            <Text style={mystyle.tab_value}>{this.state.result.historyOmissionCount}</Text>
                            <Text style={mystyle.tab_text}>历史最大遗漏期数</Text>
                        </View>
                        <View style={styles.splitLine_vertical}></View>
                        <View>
                            <Text style={mystyle.tab_value}>{this.state.result.omissionDayCount}</Text>
                            <Text style={mystyle.tab_text}>历史最大遗漏天数</Text>
                        </View>
                        <View style={styles.splitLine_vertical}></View>
                        <View>
                            <Text style={mystyle.tab_value}>{this.state.result.threeMonthAppearCount}</Text>
                            <Text style={mystyle.tab_text}>历史出现次数</Text>
                        </View>
                    </View>
                    <View style={styles.splitLine}></View>
                </View>
            </View>
        )
    }
}
// {"todayAppearCount":2,"historyOmissionCount":472,"todayAppearPeriod":"20170317011","threeMonthAppearCount":7596,"todayOmissionMaxCount":18,
// "lastTimeAppearPeriod":"20170317002","omissionDayCount":3,"averangeAppearPercent":"2.09","currentOmissionCount":18,"success":true}

const  mystyle = StyleSheet.create({
    tabrow:{
        flexDirection:'row',
        height:40,
        alignItems:'center',
        justifyContent:'space-around',
    },
    tab_text: {
        textAlign: 'center',
        fontSize: Utils.FONT_NORMAL,
        color:'#333',
        flex:1,
    },
    tab_value:{
        textAlign: 'center',
        fontSize: Utils.FONT_NORMAL,
        color:'#ea5656',
        flex:1,
    },
    allview:{
        marginHorizontal:10,
    },
    row:{
        flexDirection:'row',
        alignItems:'center',
        paddingVertical:3,
    },
    text_yilou:{
        fontSize:Utils.FONT_NORMAL,
        color:'#ea5656',
    },
    icon_text_selected:{
        backgroundColor:'rgb(255,131,33)',
        padding:3,
        borderWidth:1,
        borderRadius:2,
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
    row_bottom:{
        marginBottom:30,
    },
    menu:{
        height:30,
    }
});