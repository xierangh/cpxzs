//团队建设
'use strict';
import React, {Component} from 'react';
import {
    Text,
    View,
    Clipboard,
    TouchableHighlight,
    ListView,
} from 'react-native';

import styles from './../stylecpxzs';
import Utils from './../Utils';
import NavigatorTitle from './../comp/NavigatorTitle'

//列表数据准备
var ds = new ListView.DataSource({rowHasChanged: function(r1, r2):bool{
                                 return (r1 !== r2);
                                 }})  // assumes immutable objects

export default class TuanduiView extends React.Component{
  constructor(props) {
    super(props)
    this.state={
      //datalist
      dataSource:ds.cloneWithRows([
        {"number":"6238858@qq.com","type":"SVIP"},
        {"number":"6238857@qq.com","type":"SVIP"},
        {"number":"6238856@qq.com","type":"SVIP"},
        {"number":"6238855@qq.com","type":"SVIP"},
        {"number":"6238854@qq.com","type":"试用VIP"},
        {"number":"6238853@qq.com","type":"VIP"},
        {"number":"6238852@qq.com","type":"VIP"},
        {"number":"6238851@qq.com","type":"VIP"},
        {"number":"6238850@qq.com","type":"VIP"},
      ]),
      total:0,
      loaded:false,
      fetchurl:'historyNumber/loadHistoryNumber',//查询当天
      //http://cpxzs.com/historyNumber/loadHistoryNumber?caipiaoType=cqssc&dateStr=0
    }
  }



  renderRow(data){
    return (
      <TouchableHighlight
       underlayColor="#fff1"
       >
      <View style={{paddingHorizontal:20,flexDirection:'row',justifyContent:'center',paddingVertical:10}} key={data.number}>
        <Text style={{flex:1,textAlign:'left',fontSize:16}}>{data.number}</Text>
        <Text style={{flex:1,textAlign:'right',fontSize:16}}>{data.type}</Text>
      </View>
      </TouchableHighlight>
    );
  }

  render(){
    return(
      <View style={styles.container}>
      <NavigatorTitle
         onPress={()=>this.props.navigator.pop()}
         text={'团队管理'}>
      </NavigatorTitle>
      <ListView
        ref='list'
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        automaticallyAdjustContentInsets={false}
        renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => <View key={sectionID,rowID} style={styles.splitLine_l}></View>}
       />
      </View>
    );
  }
}
