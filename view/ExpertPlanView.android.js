'use strict';
import React, {Component} from 'react';
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

import styles from './stylecpxzs';
import Utils from './Utils';
import Loading from './comp/Loading'
import PlanItemView from './comp/PlanItemView'
import PlanSelectView from './comp/PlanSelectView'
import NotoolTimeViewOld from './comp/NotoolTimeView'


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
class ExpertPlanView extends React.Component {

  static propTypes={
    loginout:React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state={
      dataSource:ds.cloneWithRows([
      {"item":"022-024","wei":"个位","planNum":"29160","resultNumber":"9,6,1,8,1","status":true,"planName":null,"itemIndex":0,"amount":95.0,
      "caipiaoList":[{"period":20161230022,"result":"9,6,1,8,1"}],"hotColdSubList":null}]),
      loaded:false,
      isPlan:false,
      planValue:'',
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
    }
  }

  componentDidMount(){
      this.onCreatePlan(1);
  }


  onfinish(){
    this.onCreatePlan(0,this.state.planValue);
  }

  onCreatePlan(isfinish:number,planValue:object){
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

    param = param +'&';
    if (isfinish == 1) {
      param = param +'jhfaName=';
    }else{
      param = param +'jhfaName='+planValue.jhfaCode;
    }

    param = param + '&activity=&pattern=3&sort=';

    this.queryPlan(param);
  }

  queryPlan(param:string){

    this.setState({
      loaded:false
    })
    Utils.post('jhfa/jhfaPlan',param)
    .then((data)=>{
          if(!data){
                  this.setState({
                    loaded:true
                  })
                  return;
           }
        if(!data.expressionName){
            this.setState({
                loaded:true
            })
            return;
        }
          //  console.log(data);
          //  console.log('queryPlan'+JSON.stringify(data));
          if (this.state.planValue) {
              var index = 0;
              for(var i in data.expressionName){
                  if(this.state.planValue.jhfaCode == data.expressionName[i].jhfaCode){
                      index = i;
                      break;
                  }
              }
            this.setState({
              planitems:data.expressionName,
                planValue:data.expressionName[index],
              dataSource:ds.cloneWithRows(data.resultList),
              btjsResultList:data.btjsResultList,
              loaded:true,
              firstPlanResult:data.firstPlanResult,
              fvlist:data.fvList,
            })
          }else{
            this.setState({
              planitems:data.expressionName,
              planValue:data.expressionName[0],
              dataSource:ds.cloneWithRows(data.resultList),
              btjsResultList:data.btjsResultList,
              loaded:true,
              firstPlanResult:data.firstPlanResult,
              fvlist:data.fvList,
            })
          }


      })
  }

  onPlanPress(){
    this.setState({
      isPlan:!this.state.isPlan
    })
  }
  onPlanSelect(value){
    this.setState({planValue:value,isPlan:false})
    this.onCreatePlan(0,value);
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
              this.onCreatePlan(0,this.state.planValue)
          },100
      );
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
      this.timer = setTimeout(()=>{
        this.timer && clearTimeout(this.timer);
        this.onCreatePlan(0,this.state.planValue)
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
        <View style={styles.firstPage_title_container}>
            <Text style={styles.firstPage_title_center}>精品计划</Text>
        </View>

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

        <View style={styles.splitLine_w}></View>
        <TouchableHighlight
          underlayColor="#fff2">
          <View style={styles.firstPage_history}>
            <View style={styles.firstPage_history_start}></View>
            <Text style={styles.firstPage_history_left}>请设置玩法方案</Text>
          </View>
        </TouchableHighlight>

        <View style={styles.jpp_hide_view_fn}>
          <Text style={{marginTop:5,marginLeft:11,marginRight:5}}>方案设置</Text>
          <View style={styles.picker_view}>
              {this.state.wf == 'dw' &&
              <Picker
                  style={styles.picker}
                  selectedValue={this.state.fn1_w+''}
                  onValueChange={(itemValue) => this.setState({fn1_w:itemValue})}>
                <Picker.Item label="个" value="1" />
                <Picker.Item label="十" value="2" />
                <Picker.Item label="百" value="3" />
                <Picker.Item label="千" value="4" />
                <Picker.Item label="万" value="5" />
              </Picker>
              }
              {this.state.wf == 'bdw' &&
              <Picker
                  style={styles.picker}
                  selectedValue={this.state.fn1_w+''}
                  onValueChange={(itemValue) => this.setState({fn1_w:itemValue})}>
                <Picker.Item label="前二" value="1" />
                <Picker.Item label="前三" value="2" />
                <Picker.Item label="后二" value="3" />
                <Picker.Item label="后三" value="4" />
                <Picker.Item label="五星" value="5" />
                <Picker.Item label="中三" value="6" />
                <Picker.Item label="前四" value="7" />
                <Picker.Item label="后四" value="8" />
              </Picker>
              }
              {this.state.wf == 'zux' &&
              <Picker
                  style={styles.picker}
                  selectedValue={this.state.fn1_w+''}
                  onValueChange={(itemValue) => this.setState({fn1_w:itemValue})}>
                <Picker.Item label="前二" value="1" />
                <Picker.Item label="后二" value="2" />
                <Picker.Item label="前三组六" value="3" />
                <Picker.Item label="中三组六" value="4" />
                <Picker.Item label="后三祖六" value="5" />
              </Picker>
              }
              {this.state.wf == 'zhx' &&
              <Picker
                  style={styles.picker}
                  selectedValue={this.state.fn1_w+''}
                  onValueChange={(itemValue) => this.setState({fn1_w:itemValue})}>
                <Picker.Item label="前二" value="1" />
                <Picker.Item label="后二" value="2" />
                <Picker.Item label="前三" value="3" />
                <Picker.Item label="中三" value="4" />
                <Picker.Item label="后三" value="5" />
              </Picker>
              }
          </View>

          <View style={styles.picker_view}>

              {this.state.wf == 'bdw' ?
                  <Picker
                      style={styles.picker}
                      selectedValue={this.state.fn2_m+''}
                      onValueChange={(itemValue) => this.setState({fn2_m: itemValue})}>
                    <Picker.Item label="1码" value="1" />
                    <Picker.Item label="2码" value="2" />
                    <Picker.Item label="3码" value="3" />
                    <Picker.Item label="4码" value="4" />
                    <Picker.Item label="5码" value="5" />
                    <Picker.Item label="6码" value="6" />
                  </Picker>
                  :
                  <Picker
                      style={styles.picker}
                      selectedValue={this.state.fn2_m+''}
                      onValueChange={(itemValue) => this.setState({fn2_m: itemValue})}>
                    <Picker.Item label="1码" value="1" />
                    <Picker.Item label="2码" value="2" />
                    <Picker.Item label="3码" value="3" />
                    <Picker.Item label="4码" value="4" />
                    <Picker.Item label="5码" value="5" />
                    <Picker.Item label="6码" value="6" />
                    <Picker.Item label="7码" value="7" />
                    <Picker.Item label="8码" value="8" />
                    <Picker.Item label="9码" value="9" />
                  </Picker>
              }
          </View>
          <View style={styles.picker_view}>
            <Picker
                ref="fn3_picker"
                style={styles.picker}
                selectedValue={this.state.fn3_q+''}
                onValueChange={(itemValue) => this.setState({fn3_q: itemValue})}>
              <Picker.Item label="1期" value="1" />
              <Picker.Item label="2期" value="2" />
              <Picker.Item label="3期" value="3" />
              <Picker.Item label="4期" value="4" />
              <Picker.Item label="5期" value="5" />
              <Picker.Item label="6期" value="6" />
              <Picker.Item label="7期" value="7" />
              <Picker.Item label="8期" value="8" />
              <Picker.Item label="9期" value="9" />
              <Picker.Item label="10期" value="10" />
              <Picker.Item label="11期" value="11" />
              <Picker.Item label="12期" value="12" />
              <Picker.Item label="13期" value="13" />
              <Picker.Item label="14期" value="14" />
              <Picker.Item label="15期" value="15" />
            </Picker>
          </View>

          <TouchableHighlight
            underlayColor={'#ea565630'}
            onPress={() => this.onfinish()}>
              <View style={{backgroundColor:'#ffaf48',borderRadius:3,width:66*Utils.scale,height:28*Utils.scale,borderWidth:1,marginRight:10,borderColor:'#ffaf48',justifyContent:'center',marginLeft:1,marginTop:1}}>
                <Text style={{textAlign:'center',color:'#fff',fontSize:12*Utils.scale}}>完成</Text>
              </View>
          </TouchableHighlight>
      </View>


        <View style={styles.splitLine_w}></View>
        <TouchableHighlight onPress={()=>this.onPlanPress()} underlayColor="#fff2">
          <View style={styles.firstPage_history}>
            <View style={styles.firstPage_history_start}></View>
            <Text style={styles.firstPage_history_left}>请选择计划</Text>
            <Text style={{fontSize:Utils.FONT_NORMAL,color:'#ea5656',flex:2,textAlign:'right'}}>{this.state.planValue.jhfaName}(准确率:{this.state.planValue.winRate}%)</Text>
            <Image source={require('./ico/down.png')} style={{width:20*Utils.scale,height:20*Utils.scale,marginRight:20}} />
          </View>
        </TouchableHighlight>
        {this.state.isPlan &&
          <PlanSelectView
              selected={this.state.planValue}
              onSelected={(value)=>this.onPlanSelect(value)}
              items={this.state.planitems}
              />
        }
        <View style={styles.splitLine}></View>
        <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
          <Text style={{fontSize:13*Utils.scale,paddingVertical:10,marginLeft:10}}>选中:</Text>
          <Text style={{fontSize:13*Utils.scale,paddingVertical:10,color:'#ea5656',flex:1}}>{this.getWf_show()}>{this.getFn1_w_show()} {this.state.fn2_m}码 {this.state.fn3_q}期>{this.state.planValue.jhfaName}({this.state.planValue.winRate}%)</Text>

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

module.exports = ExpertPlanView;
