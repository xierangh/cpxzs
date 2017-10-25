/*
 *开奖历史查询
 */
'use strict';
import React, {Component} from 'react';
import {
    Text,
    ListView,
    View,
    Image,
    Modal,
    TouchableHighlight,
} from 'react-native';

import styles from '../stylecpxzs';
import Utils from '../Utils';
import LoadingView from '../comp/Loading';
import NavigatorTitle from '../comp/NavigatorTitle';
import Calendar from 'react-native-calendar';
import moment from  'moment';

//列表数据准备
var ds = new ListView.DataSource({rowHasChanged: function(r1, r2):bool{
                                 return (r1 !== r2);
                                 }})  // assumes immutable objects
var customDayHeadings = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

//{"data":[{"period":"20170703001","number":"4,2,4,2,2","time":null,"pattern":"组三"},
// {"period":"20170703002","number":"6,4,6,6,5","time":null,"pattern":"组三"},
// {"period":"20170703003","number":"5,3,8,1,2","time":null,"pattern":"组六"},
// {"period":"20170703004","number":"8,8,1,2,5","time":null,"pattern":"组六"},
// {"period":"20170703005","number":"9,3,1,5,8","time":null,"pattern":"组六"},
// {"period":"20170703006","number":"4,5,0,4,2","time":null,"pattern":"组六"},
// {"period":"20170703007","number":"0,2,8,0,2","time":null,"pattern":"组六"},
// {"period":"20170703008","number":"5,6,7,7,0","time":null,"pattern":"组三"},
// {"period":"20170703009","number":"9,4,7,9,7","time":null,"pattern":"组三"},
// {"period":"20170703010","number":"0,5,6,8,7","time":null,"pattern":"组六"},
// {"period":"20170703011","number":"4,6,9,6,7","time":null,"pattern":"组六"},
// {"period":"20170703012","number":"3,0,3,3,2","time":null,"pattern":"组三"},
// {"period":"20170703013","number":"5,0,7,0,0","time":null,"pattern":"组三"},{"period":"20170703014","number":"0,5,8,5,9","time":null,"pattern":"组六"},{"period":"20170703015","number":"3,7,6,2,2","time":null,"pattern":"组三"},{"period":"20170703016","number":"2,4,5,1,7","time":null,"pattern":"组六"},{"period":"20170703017","number":"1,9,4,0,9","time":null,"pattern":"组六"},{"period":"20170703018","number":"6,1,2,8,8","time":null,"pattern":"组三"},{"period":"20170703019","number":"0,5,5,6,7","time":null,"pattern":"组六"},{"period":"20170703020","number":"2,6,2,9,2","time":null,"pattern":"组三"},{"period":"20170703021","number":"5,1,0,9,0","time":null,"pattern":"组三"},{"period":"20170703022","number":"3,4,7,6,4","time":null,"pattern":"组六"},{"period":"20170703023","number":"8,6,8,3,2","time":null,"pattern":"组六"},{"period":"20170703024","number":"4,5,8,2,9","time":null,"pattern":"组六"},{"period":"20170703025","number":"9,8,1,8,8","time":null,"pattern":"组三"},{"period":"20170703026","number":"3,4,2,9,8","time":null,"pattern":"组六"},{"period":"20170703027","number":"8,1,0,6,4","time":null,"pattern":"组六"},{"period":"20170703028","number":"8,6,7,9,9","time":null,"pattern":"组三"},{"period":"20170703029","number":"8,4,7,5,0","time":null,"pattern":"组六"},{"period":"20170703030","number":"7,6,5,0,9","time":null,"pattern":"组六"},{"period":"20170703031","number":"8,6,6,8,8","time":null,"pattern":"组三"},{"period":"20170703032","number":"7,1,8,4,7","time":null,"pattern":"组六"},{"period":"20170703033","number":"9,4,7,5,5","time":null,"pattern":"组三"},{"period":"20170703034","number":"0,0,0,7,1","time":null,"pattern":"组六"},{"period":"20170703035","number":"3,1,3,3,6","time":null,"pattern":"组三"},{"period":"20170703036","number":"8,6,4,7,1","time":null,"pattern":"组六"},{"period":"20170703037","number":"4,1,6,9,8","time":null,"pattern":"组六"},{"period":"20170703038","number":"0,1,6,2,2","time":null,"pattern":"组三"},{"period":"20170703039","number":"4,2,2,8,7","time":null,"pattern":"组六"},{"period":"20170703040","number":"3,6,2,4,1","time":null,"pattern":"组六"},{"period":"20170703041","number":"7,8,8,0,0","time":null,"pattern":"组三"},{"period":"20170703042","number":"5,4,8,0,8","time":null,"pattern":"组三"},{"period":"20170703043","number":"3,6,9,1,1","time":null,"pattern":"组三"},{"period":"20170703044","number":"4,0,9,9,6","time":null,"pattern":"组三"},{"period":"20170703045","number":"3,3,0,4,5","time":null,"pattern":"组六"},{"period":"20170703046","number":"1,5,5,3,4","time":null,"pattern":"组六"}],"success":true}
export default class HistoryView extends React.Component{
    constructor(props){
      super(props)
      this.state={
        dataSource:ds.cloneWithRows([
          {"number":"14042","item":"001","firstThreePattern":"组六","midThreePattern":"组三","lastThreePattern":"组六","thirdNumPattern":"小双","fourthNumPattern":"小双"},
          {"number":"11197","item":"002","firstThreePattern":"豹子","midThreePattern":"组三","lastThreePattern":"组六","thirdNumPattern":"大单","fourthNumPattern":"大单"},
          {"number":"25788","item":"003","firstThreePattern":"组六","midThreePattern":"组六","lastThreePattern":"组三","thirdNumPattern":"大双","fourthNumPattern":"大双"},
          {"number":"03351","item":"004","firstThreePattern":"组三","midThreePattern":"组三","lastThreePattern":"组六","thirdNumPattern":"大单","fourthNumPattern":"小单"},
          {"number":"42969","item":"005","firstThreePattern":"组六","midThreePattern":"组六","lastThreePattern":"组三","thirdNumPattern":"大双","fourthNumPattern":"大单"},
          {"number":"64264","item":"006","firstThreePattern":"组六","midThreePattern":"组六","lastThreePattern":"组六","thirdNumPattern":"大双","fourthNumPattern":"小双"},
          {"number":"58665","item":"007","firstThreePattern":"组六","midThreePattern":"组三","lastThreePattern":"组三","thirdNumPattern":"大双","fourthNumPattern":"大单"},
          {"number":"13391","item":"008","firstThreePattern":"组三","midThreePattern":"组三","lastThreePattern":"组六","thirdNumPattern":"大单","fourthNumPattern":"小单"},
          {"number":"98168","item":"009","firstThreePattern":"组六","midThreePattern":"组六","lastThreePattern":"组六","thirdNumPattern":"大双","fourthNumPattern":"大双"}
        ]),
        total:0,
        loaded:false,
        fetchurl:'historyNumber/loadHistoryNumber',//查询当天
        //http://cpxzs.com/historyNumber/loadHistoryNumber?caipiaoType=cqssc&dateStr=0
        modalVisible: false,
        qdate:moment().format('YYYY-MM-DD')
      }
    }

    showModal(){
        this.setState({
            modalVisible: true
        })
    }

    onRequestClose() {
        this.setState({
            modalVisible: flase
        })
    }

    componentDidMount(){
      this.queryData('caipiaoType=cqssc&dateStr=0');
    }

    queryData(param:string){
      // if (!Utils.online) {
      //   return;
      // }
      this.setState({
        loaded:false,
      })
       Utils.getWithParams(this.state.fetchurl,param)
       .then((data)=>{
             if(!data){
                     this.setState({
                                loaded:true,
                                });
                     return;
              }
               // console.log(JSON.stringify(data.details))
               this.setState({
                 dataSource:ds.cloneWithRows(data.historyNumberList.reverse()),
                 loaded:true,
                 // charthtml:JSON.stringify(data.details),
               });
         })
     }

     formatNumber(num:string){
       var numstr = '';
       for (var i = 0; i < num.length; i++) {
         if(i== num.length-1){
           numstr = numstr +num.charAt(i);
           return numstr;
         }
         numstr = numstr +num.charAt(i)+" ";
       }
     }

     //view for row
     renderRow(data) {
     return(
            <TouchableHighlight
             underlayColor="#fff1"
            >
            <View style={styles.rowStyle} key={data.item}>
            <Text style={styles.histroy_item}>{data.item}</Text>
            <Text style={styles.history_center_w}>{this.formatNumber(data.number)}</Text>
            <Text style={[styles.history_center,this.getStyle(data.firstThreePattern)]}>{data.firstThreePattern}</Text>
            <Text style={[styles.history_center,this.getStyle(data.midThreePattern)]}>{data.midThreePattern}</Text>
            <Text style={[styles.history_end,this.getStyle(data.lastThreePattern)]}>{data.lastThreePattern}</Text>
            </View>
            </TouchableHighlight>
            );
     }

     onPress(){
        this.showModal();
     }

     onDateSelect(qdate:string){
         // this.setState({
         //               date:qdate,
         //               loaded:false,
         //               noAlarm:false,
         //               });
        //  this.auditDate(qdate);
        var olddate = this.state.qdate;
        this.setState({
          modalVisible: false,
          qdate:qdate,
        });

        //如果日期相同就不进行查询了
        if(olddate == qdate){
          return;
        }
        //Utils.showAlert(qdate,'提示');
        this.queryData('caipiaoType=cqssc&dateStr='+qdate)
     }

     getStyle(value:string){
       if (value == '组三') {
         return styles.firstPage_history_item_zusan;
       }
       if (value == '组六') {
         return styles.firstPage_history_item_zuliu;
       }
       if (value == '豹子') {
         return styles.firstPage_history_item_baozi;
       }
       return styles.firstPage_history_item_zusan;
     }

    render(){
      return (
        <View style={styles.container}>
          <NavigatorTitle
             onPress={()=>this.props.navigator.pop()}
             text={'历史开奖详情'}>
          </NavigatorTitle>
          <View style={{flexDirection:'row',marginVertical:5,justifyContent:'center'}}>
            <Image source={require('./../ico/logo_min.png')} style={{marginLeft:10,marginRight:6,width:30,height:30}} / >
            <Text style={{textAlign:'left',flex:1,alignSelf:'center'}}>时时彩{this.state.qdate}开奖记录</Text>
            <TouchableHighlight
            underlayColor={'#0002'}
             onPress={() => this.onPress()}>
                <View style={{backgroundColor:'#fff',borderRadius:3,width:66,height:30,borderWidth:1,marginRight:10,borderColor:'#ffaf48',justifyContent:'center',marginLeft:1,marginTop:1}}>
                  <Text style={{textAlign:'center',color:'#ffaf48'}}>选择日期</Text>
                </View>
            </TouchableHighlight>
          </View>
          <Modal
              visible={this.state.modalVisible}
              //显示是的动画默认none
              //从下面向上滑动slide
              //慢慢显示fade
              animationType = {'slide'}
              //是否透明默认是不透明 false
              transparent = {true}
              //关闭时调用
              onRequestClose={()=> this.onRequestClose()}
              >

              <View style={{backgroundColor:'red',marginTop:100}}>
              <Calendar
                  customStyle={{day: {fontSize: 15, textAlign: 'center'}}} // Customize any pre-defined styles
                  dayHeadings={customDayHeadings}               // Default: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
                  nextButtonText={'后一月'}           // Text for next button. Default: 'Next'
                  onDateSelect={(date) => this.onDateSelect(moment(date).format('YYYY-MM-DD'))} // Callback after date selection
                  onSwipeNext={this.onSwipeNext}    // Callback for forward swipe event
                  onSwipePrev={this.onSwipePrev}    // Callback for back swipe event
                  onTouchNext={this.onTouchNext}    // Callback for next touch event
                  onTouchPrev={this.onTouchPrev}    // Callback for prev touch event
                  prevButtonText={'前一月'}           // Text for previous button. Default: 'Prev'
                  scrollEnabled={true}              // False disables swiping. Default: False
                  selectedDate={this.state.qdate}       // Day to be selected
                  showControls={true}               // False hides prev/next buttons. Default: False
                  showEventIndicators={true}        // False hides event indicators. Default:False
                  titleFormat={'YYYY-MM'}         // Format for displaying current month. Default: 'MMMM YYYY'
                  weekStart={1} // Day on which week starts 0 - Sunday, 1 - Monday, 2 - Tuesday, etc, Default: 1
                  />
              </View>
          </Modal>
          <View style={styles.splitLine}></View>
          <View style={[styles.tableHeader,styles.tableHeader_bord]} >
            <Text style={[styles.histroy_item,styles.headerFont]}>期次</Text>
            <Text style={[styles.history_center_w,styles.headerFont,styles.headermgr]}>开奖号码</Text>
            <Text style={[styles.history_center,styles.headerFont,styles.headermgr]}>前三</Text>
            <Text style={[styles.history_center,styles.headerFont,styles.headermgr]}>中三</Text>
            <Text style={[styles.history_end,styles.headerFont,styles.headermgr]}>后三</Text>
          </View>
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
