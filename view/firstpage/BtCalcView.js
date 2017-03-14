/**
 * 倍投计算
 */

import React from 'react';
import {
    Text,
    ListView,
    View,
    Image,
    TouchableHighlight,
    StyleSheet,
    TextInput,
} from 'react-native';

import Utils from './../Utils'
import styles from './../stylecpxzs';
import NavigatorTitle from './../comp/NavigatorTitle';
import NotoolTimeViewOld from './../comp/NotoolTimeView';
import LoadingView from './../comp/Loading'

//列表数据准备
var ds = new ListView.DataSource({rowHasChanged: function(r1, r2):bool{
    return (r1 !== r2);
}})  // assumes immutable objects

export default class BtCalcView extends React.Component{

    constructor(props){
        super(props)
        this.state={
            dataSource:ds.cloneWithRows([]),
            cathecticCount:'5',
            itemCount:'5',
            beginTimes:'2',
            maxAmount:'1000000',
            bonus:'15',
            yeildRate:'20',
            loaded:true,
        }
    }

    btCalc(){

        var param ='';
        param = param +'cathecticCount='+this.state.cathecticCount;
        param = param +'&';
        param = param +'itemCount='+this.state.itemCount;
        param = param +'&';
        param = param +'beginTimes='+this.state.beginTimes;
        param = param +'&';
        param = param +'maxAmount='+this.state.maxAmount;
        param = param +'&';
        param = param +'bonus='+this.state.bonus;
        param = param +'&';
        param = param +'yeildRate='+this.state.yeildRate;

        this.setState({
            loaded:false,
        })
        Utils.getWithParams('btjs/btjsCompute',param)
            .then((data)=>{
                if(!data.data){
                    this.setState({
                        loaded:true,
                    });
                    return;
                }

/**
 * {"data":{"exceedBool":false,"resultList":
 * [{"item":1,"times":2,"currentAmount":20,"sumAmount":20,"currentBonus":"30.00","sumBonus":"10.00","sumYeild":"10.00","yeildRate":"50.00%"},
 * {"item":2,"times":8,"currentAmount":80,"sumAmount":100,"currentBonus":"120.00","sumBonus":"20.00","sumYeild":"20.00","yeildRate":"20.00%"},
 * {"item":3,"times":40,"currentAmount":400,"sumAmount":500,"currentBonus":"600.00","sumBonus":"100.00","sumYeild":"100.00","yeildRate":"20.00%"},
 * {"item":4,"times":200,"currentAmount":2000,"sumAmount":2500,"currentBonus":"3000.00","sumBonus":"500.00","sumYeild":"500.00","yeildRate":"20.00%"},
 * {"item":5,"times":1000,"currentAmount":10000,"sumAmount":12500,"currentBonus":"15000.00","sumBonus":"2500.00","sumYeild":"2500.00","yeildRate":"20.00%"}],"yeildRateBool":true,"msg":null},"success":true}
 */
                console.log(JSON.stringify(data.data))
                if (!data.data.yeildRateBool){
                    Utils.showAlert('',data.data.msg);
                    this.setState({
                        dataSource:ds.cloneWithRows([]),
                        loaded:true,
                    });
                    return;
                }

                if (data.data.msg){
                    Utils.showAlert('',data.data.msg);
                }

                this.setState({
                    dataSource:ds.cloneWithRows(data.data.resultList),
                    loaded:true,
                    // charthtml:JSON.stringify(data.details),
                });
            })
    }

    rowTitle(){
        return (
            <View style={[styles.rowStyle,{backgroundColor:'#e9e9e9'}]}>
                <Text style={mystyle.rowItem}>期数</Text>
                <Text style={mystyle.rowItem}>倍数</Text>
                <Text style={mystyle.rowItem}>本期投入</Text>
                <Text style={mystyle.rowItem}>累计投入</Text>
                <Text style={mystyle.rowItem}>奖金收益</Text>
            </View>
        )
    }

    renderRow(data){
        return (
            <View style={styles.rowStyle}>
                <Text style={mystyle.rowItem}>{data.item}</Text>
                <Text style={mystyle.rowItem}>{data.times}</Text>
                <Text style={mystyle.rowItem}>{data.currentAmount}</Text>
                <Text style={mystyle.rowItem}>{data.sumAmount}</Text>
                <Text style={mystyle.rowItem}>{data.sumBonus}</Text>
            </View>
        )
    }

    render(){

        return(
            <View style={styles.container}>
                <NavigatorTitle
                    onPress={()=>this.props.navigator.pop()}
                    text={'倍投计算'}>
                </NavigatorTitle>

                <NotoolTimeViewOld
                    ref='timeview'
                />
                <View style={styles.splitLine}></View>

                <View style={mystyle.row}>
                    <View style={mystyle.row_input}>
                        <Text style={mystyle.text}>投注注数</Text>
                        <TextInput style={mystyle.style_input}
                                   underlineColorAndroid={'transparent'}
                                   autoCorrect={false}
                                   onChangeText={(text) => this.setState({cathecticCount:text})}
                                   value={this.state.cathecticCount}
                                   keyboardType='numeric'
                                   placeholderTextColor='#929292'></TextInput>
                        <Text style={mystyle.text_right}>注</Text>
                    </View>
                    <View style={mystyle.row_input}>
                        <Text style={mystyle.text}>追号期数</Text>
                        <TextInput style={mystyle.style_input}
                                   underlineColorAndroid={'transparent'}
                                   autoCorrect={false}
                                   onChangeText={(text) => this.setState({itemCount:text})}
                                   value={this.state.itemCount}
                                   keyboardType='numeric'
                                   placeholderTextColor='#929292'></TextInput>
                        <Text style={mystyle.text_right}>期</Text>
                    </View>
                </View>

                <View style={mystyle.row}>
                    <View style={mystyle.row_input}>
                        <Text style={mystyle.text}>起始倍数</Text>
                        <TextInput style={mystyle.style_input}
                                   underlineColorAndroid={'transparent'}
                                   autoCorrect={false}
                                   onChangeText={(text) => this.setState({beginTimes:text})}
                                   value={this.state.beginTimes}
                                   keyboardType='numeric'
                                   placeholderTextColor='#929292'></TextInput>
                        <Text style={mystyle.text_right}>倍</Text>
                    </View>
                    <View style={mystyle.row_input}>
                        <Text style={mystyle.text}>最多投入</Text>
                        <TextInput style={mystyle.style_input}
                                   underlineColorAndroid={'transparent'}
                                   autoCorrect={false}
                                   onChangeText={(text) => this.setState({maxAmount:text})}
                                   value={this.state.maxAmount}
                                   keyboardType='numeric'
                                   placeholderTextColor='#929292'></TextInput>
                        <Text style={mystyle.text_right}>元</Text>
                    </View>
                </View>

                <View style={mystyle.row}>
                    <View style={mystyle.row_input}>
                        <Text style={mystyle.text}>奖金</Text>
                        <TextInput style={mystyle.style_input}
                                   underlineColorAndroid={'transparent'}
                                   autoCorrect={false}
                                   onChangeText={(text) => this.setState({bouns:text})}
                                   value={this.state.bonus}
                                   keyboardType='numeric'
                                   placeholderTextColor='#929292'></TextInput>
                        <Text style={mystyle.text_right}>元</Text>
                    </View>
                    <View style={mystyle.row_input}>
                        <Text style={mystyle.text}>收益率</Text>
                        <TextInput style={mystyle.style_input}
                                   underlineColorAndroid={'transparent'}
                                   autoCorrect={false}
                                   onChangeText={(text) => this.setState({yeildRate:text})}
                                   value={this.state.yeildRate}
                                   keyboardType='numeric'
                                   placeholderTextColor='#929292'></TextInput>
                        <Text style={mystyle.text_right}>%</Text>
                    </View>
                </View>

                <View style={[mystyle.row,{backgroundColor:'#fffaf6',marginBottom:10,paddingRight:10}]}>
                    <Text style={[mystyle.text,{textAlign:'center'}]}>我们将根据您的条件设置，生成相应方案</Text>
                    <TouchableHighlight
                        underlayColor={'#0002'}
                        onPress={() => this.btCalc()}>
                        <View style={styles.yellowbtn}>
                            <Text style={styles.notool_btn_text}>立即计算</Text>
                        </View>
                    </TouchableHighlight>
                </View>

                {this.rowTitle()}
                <View style={styles.splitLine}></View>
                {this.state.loaded ?
                    <ListView
                        ref='list'
                        dataSource={this.state.dataSource}
                        renderRow={(rowdata)=>this.renderRow(rowdata)}
                        enableEmptySections={true}
                        automaticallyAdjustContentInsets={false}
                        renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => <View key={sectionID,rowID} style={styles.splitLine_l}></View>}
                    />
                    :
                    <LoadingView />
                }
            </View>
        );
    }
}

const  mystyle = StyleSheet.create({
    text:{
      flex:1,
      fontSize:Utils.FONT_NORMAL,
      color:'#000',
      textAlign:'right',
      marginRight:5,
    },
    text_right:{
        fontSize:Utils.FONT_NORMAL,
        color:'#000',
        width:15*Utils.scale,
        textAlign:'center'
    },
    row:{
        flexDirection:'row',
        alignItems:'center',
        marginVertical:5,
    },
    row_input:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        marginHorizontal:10,
    },
    style_input: {
        paddingLeft:10,
        paddingRight:10,
        height: 25*Utils.scale,
        fontSize:Utils.FONT_NORMAL,
        color:'#929292',
        flex: 1,
        alignSelf:'center',
        textAlign:'center',
        borderWidth:1,
        borderColor:'#ccc',
        borderRadius:4,
    },

    //row style
    rowItem:{
        flex:1,
        textAlign: 'center',
        color: '#333',
        alignSelf: 'center', //位置
        fontSize: Utils.FONT_SMALL,
    }

});

