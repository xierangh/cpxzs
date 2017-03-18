'use strict';
import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight,
    ListView,
} from 'react-native';

import styles from './stylecpxzs';
import Utils from './Utils';
import LoadingView from './comp/Loading'
import NotoolTimeViewOld from './comp/NotoolTimeView'
import NavigatorTitle from './comp/NavigatorTitle'
import NewsDescView from './NewsDescView'


//列表数据准备
var ds = new ListView.DataSource({rowHasChanged: function(r1, r2):bool{
                                 return (r1 !== r2);
                                 }})  // assumes immutable objects

export default class NewsView extends React.Component{

  constructor(props) {
    super(props)
    this.state={
      //datalist
      dataSource:ds.cloneWithRows([]),
      total:0,
      loaded:false,
      fetchurl:'news/appNoticeList',//查询公告
    }
  }

  componentDidMount(){
    // this.queryTime();
    this.queryNews();
  }

  queryNews(){
    var param = 'page=0';
    this.setState({
               loaded:false,
               });
    Utils.getWithParams(this.state.fetchurl,param)
    .then((data)=>{
      // console.log(data);
      // console.log('queryNews='+JSON.stringify(data.data));
          if(!data){
                  this.setState({
                             loaded:true,
                             });
                  return;
           }
            // console.log(JSON.stringify(data.details))
            this.setState({
              dataSource:ds.cloneWithRows(data.data),
              loaded:true,
              // charthtml:JSON.stringify(data.details),
            });
      })
  }

  queryTime(){
    this.timer && clearTimeout(this.timer);

     Utils.getWithParams('caipiaoNumber/queryNextPeriod')
     .then((data)=>{
           if(!data){
               this.refs.timeview.setNextPeroid('','');
               return;
            }
            //  console.log(JSON.stringify(data))
            var seconds = parseInt(data.hour)*3600 + parseInt(data.minute)*60+parseInt(data.second);
            this.refs.timeview.setNextPeroid(data.nextPeriodStr,seconds);
       })
  }

  gotoDesc(key){
    console.log('gotoDesc key:'+key);
    this.props.navigator.push({
                    navigationBarHidden:true,
                    title:key,
                    component:NewsDescView,
                    passProps:{
                        data:key
                     }
    });
  }


  renderRowNews(data){
    var arr = data.createTime.split(' ');

    return (
      <TouchableHighlight
       underlayColor="#fff1"
       onPress={() => this.gotoDesc(data.key)}
       >
        <View style={{marginLeft:10,marginRight:10,paddingVertical:10}} key={data.key}>
          <View style={styles.rowStyle}>
            <Text style={{textAlign:'left',fontSize:14,color:'#1086d1',flex:1}}>{arr[0]}</Text>
            <Text style={{textAlign:'right',fontSize:14,color:'#999',flex:1}}>{arr[1]}</Text>
          </View>
          <Text style={{textAlign:'left',fontSize:16,color:'#434343'}}>{data.title}</Text>
        </View>
      </TouchableHighlight>
      )
  }

  render(){
    return (
      <View style={styles.container}>
        <NavigatorTitle
           onPress={()=>this.props.navigator.pop()}
           text={'公告'}>
        </NavigatorTitle>

          <NotoolTimeViewOld />

          <View style={styles.splitLine}></View>
          {this.state.loaded ?
            <ListView
                ref='list'
                dataSource={this.state.dataSource}
                renderRow={this.renderRowNews.bind(this)}
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
