/**
  *首页
  */
import React, {Component,PropTypes} from 'react';
import {
    Text,
    ListView,
    View,
    Image,
    TouchableHighlight,
    StatusBar,

} from 'react-native';

import styles from './stylecpxzs';
import Utils from './Utils';
import LoadingView from './comp/Loading';
import ImageButton from './comp/ImageButton';
import NotoolTimeViewOld from './comp/NotoolTimeViewOld'
import PullRefreshScroll from 'react-native-pullrefresh-scrollview'

// import SocketIO from 'react-native-swift-socketio';


var socketConfig = { path: '/socket' };

const WS_EVENTS = [
  'close',
  'error',
  'message',
  'open',
  'estimate',
];

export default class FirstPageView extends React.Component{

  static propTypes={
      onItemPress:PropTypes.func,
      onMorePress:PropTypes.func,
      onNewsPress:PropTypes.func,
    }

    constructor(props){
         super(props);
         var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
         this.state={
              ds:ds,
             //datalist
             dataSource:ds.cloneWithRows([
               {"number":"14042","item":"001","firstThreePattern":"组六","midThreePattern":"组三","lastThreePattern":"组六","thirdNumPattern":"小双","fourthNumPattern":"小双"},
               {"number":"11197","item":"002","firstThreePattern":"豹子","midThreePattern":"组三","lastThreePattern":"组六","thirdNumPattern":"大单","fourthNumPattern":"大单"},
               {"number":"25788","item":"003","firstThreePattern":"组六","midThreePattern":"组六","lastThreePattern":"组三","thirdNumPattern":"大双","fourthNumPattern":"大双"},
               {"number":"03351","item":"004","firstThreePattern":"组三","midThreePattern":"组三","lastThreePattern":"组六","thirdNumPattern":"大单","fourthNumPattern":"小单"}
             ]),
             total:0,
             loaded:false,
             fetchurl:'historyNumber/loadHistoryNumber?caipiaoType=cqssc&dateStr=0',//查询当天最近的
            //  http://cpxzs.com/historyNumber/loadHistoryNumber?caipiaoType=cqssc&dateStr=0
            currentNumberArr:[],
            currentPeriod:'',
            url:'ws://192.168.0.211:9002/estimate',
            // url:'ws://192.168.1.103:9002',
            // url:'ws://192.168.1.103:5555',
            socketState:false,
         }
    }

  componentDidMount(){
    this.refreshMust();
  }

  refreshMust(){
      this.queryTime();
  }
  refresh(){
      this.timer && clearTimeout(this.timer);
    // this.queryTime();
      this.timer = setInterval(()=>{
          this.timer && clearTimeout(this.timer);
          this.queryCurrentPeriod();
      },1000*60*2
      );
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
            this.queryCurrentPeriod();
       })
  }

  queryCurrentPeriod(){
    this.setState({
      loaded:false
    })
     Utils.getWithParams('caipiaoNumber/numberPattern')
     .then((data)=>{
             if(!data){
               this.setState({
                 loaded:true
               })
                return;
              }
             // console.log(JSON.stringify(data.details))
             this.setState({
               currentNumberArr:data.currentNumberArr,
               currentPeriod:data.currentPeriod,
               // charthtml:JSON.stringify(data.details),
             });
             this.queryData(this.state.fetchurl);
       })
   }

   queryData(furl:string){
      Utils.getWithParams(furl)
      .then((data)=>{
            this.refs.PullRefresh.scrollsToTop=true;
            if(!data){
                    this.setState({
                               loaded:true,
                               });
                    return;
             }
              // console.log(JSON.stringify(data.details))
              console.log('queryData:'+data);
              this.setState({
                dataSource:this.state.ds.cloneWithRows(data.historyNumberList.reverse()),
                loaded:true,
                // charthtml:JSON.stringify(data.details),
              });
        })
    }

   loadData(){
       this.queryData(this.state.fetchurl);
   }

   onBtnPress(title,data){
    //  console.log(title+','+data);
     this.props.onItemPress && this.props.onItemPress(title,data);
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
  //view for row
  renderRow(data) {
  return(
         <TouchableHighlight
          underlayColor="#fff1"
          >
         <View style={styles.rowStyle} >
         <Text style={styles.histroy_item}>{data.item}</Text>
         <Text style={styles.history_center_w}>{this.formatNumber(data.number)}</Text>
         <Text style={[styles.history_center,this.getStyle(data.firstThreePattern)]}>{data.firstThreePattern}</Text>
         <Text style={[styles.history_center,this.getStyle(data.midThreePattern)]}>{data.midThreePattern}</Text>
         <Text style={[styles.history_end,this.getStyle(data.lastThreePattern)]}>{data.lastThreePattern}</Text>
         </View>
         </TouchableHighlight>
         );
  }

  goGonggao(){
    this.props.onNewsPress && this.props.onNewsPress();
    // this._connect();
    // this.connect();
  }
  goHistory(){
    this.props.onMorePress && this.props.onMorePress();
  }
  render(){
    return (

      <View style={styles.container}>
          <StatusBar
              backgroundColor="#f000"
              barStyle="default"
              translucent={true}
          />
        <View style={styles.firstPage_title_container}>
            <Text style={styles.firstPage_title_left}>彩票小助手</Text>
            <TouchableHighlight
                underlayColor={'#ea565620'}
                style={styles.firstPage_title_right_tl}
                onPress={()=>this.goGonggao()}
                >
                <Text style={styles.firstPage_title_right}>公告</Text>
            </TouchableHighlight>
        </View>
        <View style={styles.firstPage_kaijiang}>
          <View style={styles.firstPage_kaijiang_icon_view}>
            <Image source={require('./ico/index_logo_2.png')} style={styles.firstPage_kaijiang_icon} />
          </View>

          <View style={styles.firstPage_kaijiang_right}>
            <View style={styles.firstPage_kaijiang_right_1}>
              <Text style={styles.firstPage_kaijiang_right_1_left}>重庆时时彩</Text>
              <Text style={styles.firstPage_kaijiang_right_1_right}>第{this.state.currentPeriod}期开奖</Text>
            </View>
            <View style={styles.splitLine_l}></View>
            <View style={styles.firstPage_kaijiang_right_2}>
                <View style={styles.firstPage_kaijiang_circle}>
                  <Text style={styles.firstPage_kaijiang_circle_number}>{this.state.currentNumberArr[0]}</Text>
                </View>
                <View style={styles.firstPage_kaijiang_circle}>
                  <Text style={styles.firstPage_kaijiang_circle_number}>{this.state.currentNumberArr[1]}</Text>
                </View>
                <View style={styles.firstPage_kaijiang_circle}>
                  <Text style={styles.firstPage_kaijiang_circle_number}>{this.state.currentNumberArr[2]}</Text>
                </View>
                <View style={styles.firstPage_kaijiang_circle}>
                  <Text style={styles.firstPage_kaijiang_circle_number}>{this.state.currentNumberArr[3]}</Text>
                </View>
                <View style={styles.firstPage_kaijiang_circle}>
                  <Text style={styles.firstPage_kaijiang_circle_number}>{this.state.currentNumberArr[4]}</Text>
                </View>
            </View>

            <View style={styles.splitLine_l}></View>
            <NotoolTimeViewOld
              style={{marginTop:8}}
              ref='timeview'
              isFirstPage={true}
              refresh={()=>this.refresh()}
            />
        </View>
      </View>

      <View style={styles.splitLine_l}></View>
      <PullRefreshScroll
          ref="PullRefresh"
          onRefresh={()=>this.refreshMust()}
          backgroundColor={'#fff'}
          showsVerticalScrollIndicator={false}
      >
      <View style={{marginTop:5}}>
        <View style={styles.firstPage_planRow}>
          <ImageButton
            onPress={()=>this.onBtnPress('精品计划','jpPlan')}
            iconUrl={require('./ico/jinpin_plan.png')}
            title={'精品计划'}
            bgcolor={'#f00'}
            />

            <ImageButton
              iconUrl={require('./ico/rema_plan.png')}
              title={'热码计划'}
              />
          <ImageButton
            iconUrl={require('./ico/baby_plan.png')}
            title={'推波计划'}
            bgcolor={'#0f0'}
            />
            <ImageButton
              onPress={()=>this.onBtnPress('做号工具','zuohao')}
              iconUrl={require('./ico/shensheng_plan.png')}
              title={'做号工具'}
              bgcolor={'#00f'}
              />
        </View>
        <View style={styles.firstPage_planRow}>
          <ImageButton
            iconUrl={require('./ico/zusan.png')}
            title={'倍投计算'}
            customStyle={styles.customStyle}
            />
          <ImageButton
            iconUrl={require('./ico/zuxuan.png')}
            title={'推波计算'}
            customStyle={styles.customStyle}
            />
            <ImageButton
              iconUrl={require('./ico/dadi.png')}
              title={'大底验证'}
              customStyle={styles.customStyle}
              />
            <ImageButton
              iconUrl={require('./ico/yilou.png')}
              title={'遗漏助手'}
              customStyle={styles.customStyle}
              />
        </View>
      </View>
      <View style={styles.splitLine_l}></View>
      <View style={styles.firstPage_history}>
        <View style={styles.firstPage_history_start}></View>
        <Text style={styles.firstPage_history_left}>历史开奖</Text>
        <TouchableHighlight
            underlayColor={'#fff2'}
            onPress={()=>this.goHistory()}>
            <Text style={styles.firstPage_history_right}>更多>></Text>
        </TouchableHighlight>
      </View>
      <View style={styles.splitLine_l}></View>


      <View style={[styles.tableHeader,styles.tableHeader_bord]} >
        <Text style={[styles.histroy_item,styles.headerFont]}>期次</Text>
        <Text style={[styles.history_center_w,styles.headerFont,styles.headermgr]}>开奖号码</Text>
        <Text style={[styles.history_center,styles.headerFont,styles.headermgr]}>前三</Text>
        <Text style={[styles.history_center,styles.headerFont,styles.headermgr]}>中三</Text>
        <Text style={[styles.history_end,styles.headerFont,styles.headermgr]}>后三</Text>
      </View>
      <View style={styles.splitLine_l}></View>
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

    </PullRefreshScroll>
  </View>);
  }
}
