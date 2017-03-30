/**
 * 热码计划
 */

import React from 'react';
import {
    Text,
    View,
    Image,
    TouchableHighlight,
    Picker,
    Modal,
    ListView,
    ScrollView,
} from 'react-native';

import styles from './../stylecpxzs';
import Utils from './../Utils';
import Loading from './../comp/Loading'
import JppHideView from './../comp/JppHideView'
import PlanItemView from './../comp/PlanItemView'
import NotoolTimeViewOld from './../comp/NotoolTimeView'
import NavigatorTitle from './../comp/NavigatorTitle'

import ModalDropdown from 'react-native-modal-dropdown';

// import ModalPicker from 'react-native-modal-picker'

import ModalPicker from './../picker/ModalPicker'

//列表数据准备
var ds = new ListView.DataSource({rowHasChanged: function(r1, r2):bool{
                                 return (r1 !== r2);
                                 }})  // assumes immutable objects

var planitems=[
{"profit":1618.5,"curBool":false,"jhfaCode":"ssc015","currentError":0,"currentCorrect":16,"winRate":100.0,
        "errorCount":0,"jhfaName":"熊猫计划","maxCorrent":16},
{"profit":1499.5,"curBool":false,"jhfaCode":"ssc017","currentError":0,"currentCorrect":14,"winRate":100.0,
        "errorCount":0,"jhfaName":"彩客计划","maxCorrent":14}
];

var wf_arr =['','','',''];
var cur = '';


const dwdata = [
    { key: 1, section: true, label: '个位' },
    { key: 2, label: '十位' },
    { key: 3, label: '百位' },
    { key: 4, label: '千位' },
    { key: 5, label: '万位' },
];

const bdwdata=[
    { key: 1, section: true, label: '前二' },
    { key: 2, label: '前三' },
    { key: 3, label: '后二' },
    { key: 4, label: '后三' },
    { key: 5, label: '五星' },
    { key: 6, label: '中三' },
    { key: 7, label: '前四' },
    { key: 8, label: '后四' },
]

const zuxdata=[
    { key: 1, section: true, label: '前二' },
    { key: 2, label: '后二' },
    { key: 3, label: '前三组六' },
    { key: 4, label: '中三组六' },
    { key: 5, label: '后三组六' },
]

const zhxdata=[
    { key: 1, section: true, label: '前二' },
    { key: 2, label: '后二' },
    { key: 3, label: '前三' },
    { key: 4, label: '中三' },
    { key: 5, label: '后三' },
]

const bdwdata_m=[
    { key: 1, section: true, label: '1码' },
    { key: 2, label: '2码' },
    { key: 3, label: '3码' },
    { key: 4, label: '4码' },
    { key: 5, label: '5码' },
    { key: 6, label: '6码' },
]

const data_m=[
    { key: 1, section: true, label: '1码' },
    { key: 2, label: '2码' },
    { key: 3, label: '3码' },
    { key: 4, label: '4码' },
    { key: 5, label: '5码' },
    { key: 6, label: '6码' },
    { key: 7, label: '7码' },
    { key: 8, label: '8码' },
    { key: 9, label: '9码' },
]

const data_q=[
    { key: 1, section: true, label: '1期' },
    { key: 2, label: '2期' },
    { key: 3, label: '3期' },
    { key: 4, label: '4期' },
    { key: 5, label: '5期' },
    { key: 6, label: '6期' },
    { key: 7, label: '7期' },
    { key: 8, label: '8期' },
    { key: 9, label: '9期' },
    { key: 10, label: '10期' },
    { key: 11, label: '11期' },
    { key: 12, label: '12期' },
    { key: 13, label: '13期' },
    { key: 14, label: '14期' },
    { key: 15, label: '15期' },
]

class RemaPlanView extends React.Component {

  static propTypes={
    loginout:React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state={
      dataSource:ds.cloneWithRows([
      {"item":"022-024","wei":"个位","planNum":"29160","resultNumber":"9,6,1,8,1","status":true,"planName":null,"itemIndex":0,"amount":95.0,
      "caipiaoList":[{"period":20161230022,"result":"9,6,1,8,1"}],"hotColdSubList":null}]),
      total:0,
      loaded:false,
      fetchurl:'loadHistoryNumber?caipioaType=cqssc&dateStr=0',//查询当天
      isWf:true,
      isFn:true,
      wf:'dw',//玩法
      fn1_w:1,//位
      fn2_m:5,//码
      fn3_q:3,//期
      showPicker:0,//0-不显示 1-位 2-码 3-期
      planitems:planitems,
      btjsResultList:[],
      firstPlanResult:'',
      times:10,
      bonus:19.5,
      fvlist:[],
      winRate:'',
    }
  }

  componentDidMount(){
    var param = 'condition=dw&jhfaPlanType=0&type=&jhfawei=1&jhfadanmaCount=5&jhfazhuiqiCount=3&times=10&bonus=19.5&yeildRate=20';
    this.queryPlan(param);
  }

  onfinish(){
      this.onCreatePlan(0);
  }

  onCreatePlan(isfinish:number){
    //condition,jhfaPlanType,type,jhfawei,jhfadanmaCount,jhfazhuiqiCount,times,bonus,yeildRate,jhfaName
    var param ='';
    param = param +'condition='+this.state.wf;
    param = param +'&';
    param = param +'jhfaPlanType='+0;
    param = param +'&';
    param = param +'type=';

    param = param +'&';
    param = param +'jhfawei='+this.state.fn1_w;
    param = param +'&';
    param = param +'jhfadanmaCount='+this.state.fn2_m;
    param = param +'&';
    param = param +'jhfazhuiqiCount='+this.state.fn3_q;

    param = param +'&';
    param = param +'times='+this.state.times;
    param = param +'&';
    param = param +'bonus='+this.state.bonus;
    param = param +'&';
    param = param +'yeildRate='+20;


    param = param + '&activity=&pattern=3&sort=';

    this.queryPlan(param);
  }

  queryPlan(param:string){

    this.setState({
      loaded:false
    })
    Utils.post('jhfa/hotColdJHFA',param)
    .then((data)=>{
          if(!data){
                  this.setState({
                    loaded:true
                  })
                  return;
           }
          //  console.log(data);
          //  console.log('queryPlan'+JSON.stringify(data));
            this.setState({
              dataSource:ds.cloneWithRows(data.resultList),
              btjsResultList:data.btjsResultList,
              loaded:true,
              firstPlanResult:data.firstPlanResult,
              fvlist:data.fvList,
              winRate:data.correctPercent,
            })

      })
  }


  wfChange(index){
    var fn1_w=1;
    var fn2_m=5;
    var fn3_q=3;
    var times=10;
    var bonus=19.5;
    switch (index) {
      case 'dw':
        fn1_w=1;
        fn2_m=5;
        fn3_q=3;
        times=10;
        bonus=19.5;
        cur = wf_arr[0];
        break;
      case 'bdw':
        fn1_w=4;
        fn2_m=2;
        fn3_q=3;
        times=2;
        bonus=1950;
        cur = wf_arr[1];
        break;
      case 'zux':
        fn1_w=2;
        fn2_m=8;
        fn3_q=5;
        times=1;
        bonus=97.5;
        cur = wf_arr[2];
        break;
      case 'zhx':
        fn1_w=1;
        fn2_m=8;
        fn3_q=5;
        times=2;
        bonus=195;
        cur = wf_arr[3];
        break;
      default:
    }

    this.setState({
      wf:index,
      fn1_w:fn1_w,
      fn2_m:fn2_m,
      fn3_q:fn3_q,
      times:times,
      bonus:bonus,
    })

      this.timerquery = setTimeout(()=>{
              this.timerquery && clearTimeout(this.timerquery);
              this.onCreatePlan(0)
          },100
      );
  }

  showPicker(index:number){
    this.setState({
      showPicker:index,
    })
  }

  getWf_show(){
    var wf = this.state.wf;
    var showstring='';
    switch (wf) {
      case 'dw':
        showstring='定位胆计划';
        break;
      case 'bdw':
        showstring='胆码计划';
        break;
      case 'zux':
        showstring='组选计划';
        break;
      case 'zhx':
        showstring='直选计划';
        break;
      default:

    }
    return showstring;
  }

  getFn1_w_show(){
    var wf = this.state.wf;
    var index =this.state.fn1_w;
    var showstring = [];
    switch (wf) {
      case 'dw':
        showstring=['个位','十位','百位','千位','万位']
        break;
      case 'bdw':
        showstring=['前二','前三','后二','后三','五星','中三','前四','后四']
        break;
      case 'zux':
        showstring=['前二','后二','前三组六','中三组六','后三组六']
        break;
      case 'zhx':
        showstring=['前二','后二','前三','中三','后三']
        break;
      default:

    }
    if(index > showstring.length){
      index = showstring.length;
      console.log('getFn1_w_show 数组越界:'+wf+":"+index);
    }
    return showstring[index-1];
  }

  //view for row
  renderRow(data) {
    return (
      <PlanItemView
        key={data.item}
        data={data}
      />
    )
  }

  refresh(){
      this.timer && clearTimeout(this.timer);
      // this.queryTime();
      this.timer = setTimeout(()=>{
        this.timer && clearTimeout(this.timer);
        this.onCreatePlan(0)
      },1000*60*2
      );
  }

  formatPlanNumber(numstr:string){
    //如果包含*号就不进行排序
    if (numstr.indexOf('*')>0) {
      return numstr;
    }
    var strarr = numstr.split('');
    var numarr = [];

    // for (var i = 0; i < strarr.length; i++) {
    //     numarr.push(parseInt(strarr[i]));
    // }
    //排序
    numarr = Utils.lodash.sortBy(strarr,function(n){return n;});
    var ret_numstr = numarr.join('');
    // for (var i = 0; i < numarr.length; i++) {
    //   ret_numstr +=numarr[i];
    // }
    return ret_numstr;
  }

  getFirstPlanResultView(){
    var fprView = [];
    for (var i = 0; i < this.state.fvlist.length; i++) {
      fprView.push(
        <View style={styles.btjs_rowStyle} key={i}>
          <Text style={styles.plan_item}>{this.state.fvlist[i].item}</Text>
          <Text style={[styles.plan_center_row_w,{marginLeft:10}]}>{this.state.fvlist[i].result?this.state.fvlist[i].result:'等待开奖'}</Text>
        </View>
      )
    }
    return fprView;
  }

  render(){
    return(
      <View style={styles.container}>
        <NavigatorTitle
            onPress={()=>this.props.navigator.pop()}
            text={'热码计划'}>
        </NavigatorTitle>

        <NotoolTimeViewOld
            ref='timeview'
            refresh={()=>this.refresh()}
            />

        <View style={styles.splitLine_l_black}></View>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          >
        <TouchableHighlight
          underlayColor="#fff2">
          <View style={styles.firstPage_history}>
            <View style={styles.firstPage_history_start}></View>
            <Text style={styles.firstPage_history_left}>请选择玩法</Text>
          </View>
        </TouchableHighlight>
        {this.state.isWf &&
          <View style={styles.jpp_hide_view}>
          <TouchableHighlight
            underlayColor={'#ea565630'}
            onPress={()=>this.wfChange('dw')}>
            <View style={[styles.jpp_hide_view_btn,this.state.wf=='dw'&&styles.jpp_hide_view_btn_selected]}>
              <Text style={this.state.wf=='dw'&&styles.jpp_hide_view_btn_text}>定位胆计划</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={'#ea565630'}
            onPress={()=>this.wfChange('bdw')}>
            <View style={[styles.jpp_hide_view_btn,this.state.wf=='bdw'&&styles.jpp_hide_view_btn_selected]}>
              <Text style={this.state.wf=='bdw'&&styles.jpp_hide_view_btn_text}>胆码计划</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={'#ea565630'}
            onPress={()=>this.wfChange('zux')}>
            <View style={[styles.jpp_hide_view_btn,this.state.wf=='zux'&&styles.jpp_hide_view_btn_selected]}>
              <Text style={this.state.wf=='zux'&&styles.jpp_hide_view_btn_text}>组选计划</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={'#ea565630'}
            onPress={()=>this.wfChange('zhx')}>
            <View style={[styles.jpp_hide_view_btn,,this.state.wf=='zhx'&&styles.jpp_hide_view_btn_selected]}>
              <Text style={this.state.wf=='zhx'&&styles.jpp_hide_view_btn_text}>直选计划</Text>
            </View>
          </TouchableHighlight>
          </View>
        }
        <View style={styles.splitLine_w}></View>
        <TouchableHighlight
          underlayColor="#fff2">
          <View style={styles.firstPage_history}>
            <View style={styles.firstPage_history_start}></View>
            <Text style={styles.firstPage_history_left}>请设置玩法方案</Text>
          </View>
        </TouchableHighlight>
        {this.state.isFn &&
            <View style={styles.jpp_hide_view_fn}>
              <Text style={{marginTop:5,marginLeft:11,marginRight:5}}>方案设置</Text>
              <View style={styles.picker_view}>
                  {this.state.wf == 'dw' &&
                  <ModalPicker
                      data={dwdata}
                      initValue={dwdata[this.state.fn1_w-1].label}
                      onChange={(option)=>{ this.setState({fn1_w:option.key}); }} />
                  }

                  {this.state.wf == 'bdw' &&
                  <ModalPicker
                      data={bdwdata}
                      initValue={bdwdata[this.state.fn1_w-1].label}
                      onChange={(option)=>{ this.setState({fn1_w:option.key}); }} />

                  }
                  {this.state.wf == 'zux' &&
                  <ModalPicker
                      data={zuxdata}
                      initValue={zuxdata[this.state.fn1_w-1].label}
                      onChange={(option)=>{ this.setState({fn1_w:option.key}); }} />
                  }
                  {this.state.wf == 'zhx' &&
                  <ModalPicker
                      data={zhxdata}
                      initValue={zhxdata[this.state.fn1_w-1].label}
                      onChange={(option)=>{ this.setState({fn1_w:option.key}); }} />
                  }
              </View>
              <View style={styles.picker_view}>
                  {this.state.wf == 'bdw' ?
                      <ModalPicker
                          data={bdwdata_m}
                          initValue={bdwdata_m[this.state.fn2_m-1].label}
                          onChange={(option)=>{ this.setState({fn2_m:option.key}); }} />
                      :
                      <ModalPicker
                          data={data_m}
                          initValue={data_m[this.state.fn2_m-1].label}
                          onChange={(option)=>{ this.setState({fn2_m:option.key}); }} />
                  }
              </View>
              <View style={styles.picker_view}>
                <ModalPicker
                    data={data_q}
                    initValue={data_q[this.state.fn3_q-1].label}
                    onChange={(option)=>{ this.setState({fn3_q:option.key}); }} />
              </View>

              <TouchableHighlight
                underlayColor={'#ea565630'}
                onPress={() => this.onfinish()}>
                  <View style={{backgroundColor:'#ffaf48',borderRadius:3,width:66*Utils.scale,height:28*Utils.scale,borderWidth:1,marginRight:10,borderColor:'#ffaf48',justifyContent:'center',marginLeft:1,marginTop:1}}>
                    <Text style={{textAlign:'center',color:'#fff',fontSize:12*Utils.scale}}>完成</Text>
                  </View>
              </TouchableHighlight>
          </View>
        }

        <View style={styles.splitLine}></View>
        <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
          <Text style={{fontSize:13*Utils.scale,paddingVertical:10,marginLeft:10}}>选中:</Text>
          <Text style={{fontSize:13*Utils.scale,paddingVertical:10,color:'#ea5656',flex:1}}>{this.getWf_show()}>{this.getFn1_w_show()} {this.state.fn2_m}码 {this.fn3_q}期>(准确率:{this.state.winRate}%)</Text>

        </View>
        <View style={styles.splitLine}></View>

        <View style={[styles.tableHeader,styles.tableHeader_bord]} >
          <Text style={[styles.plan_item,styles.headerFont,styles.headermgr]}>期数</Text>
          <Text style={[styles.plan_center_w,styles.headerFont,styles.headermgr]}>中奖号码</Text>
          <Text style={[styles.plan_center_w,styles.headerFont,styles.headermgr]}>计划号码</Text>
          <Text style={[styles.plan_center,styles.headerFont,styles.headermgr]}>状态</Text>
        </View>
        <View style={styles.splitLine}></View>
        {this.state.loaded &&
        <View style={{flexDirection:'row'}}>
          <View style={{flex:4}}>
            {this.getFirstPlanResultView()}
          </View>
          <View style={{marginLeft:5,flexDirection:'row',justifyContent:'space-around',flex:3}}>
            <Text style={{flex:2,marginLeft:10,alignSelf:'center',textAlign:'left',color:'#f00',fontSize:12*Utils.scale}}>{this.state.firstPlanResult?this.formatPlanNumber(this.state.firstPlanResult):'00000'}</Text>
            <Text style={{flex:1,alignSelf:'center',textAlign:'left',color:'#f00',marginRight:5,fontSize:12*Utils.scale}}>投注中...</Text>
          </View>
        </View>
        }
        <View style={styles.splitLine}></View>

        {this.state.loaded ?
          <ListView
              ref='list'
              dataSource={this.state.dataSource}
              renderRow={this.renderRow}
              automaticallyAdjustContentInsets={false}
              enableEmptySections={true}
              renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => <View key={sectionID,rowID} style={styles.splitLine_l}></View>}
              />
          :
          <Loading />
        }

        </ScrollView>
      </View>
    )
  }
}

module.exports = RemaPlanView;
