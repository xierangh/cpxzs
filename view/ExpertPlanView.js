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
import ModalPicker from './picker/ModalPicker'
import VipchargeView2 from './usercenter/VipchargeView2'



const dwdata=[
    { key: 1, section: true, label: '个' },
    { key: 2, label: '十' },
    { key: 3, label: '百' },
    { key: 4, label: '千' },
    { key: 5, label: '万' },
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

const bdwdata_m=[
    { key: 1, section: true, label: '1码' },
    { key: 2, label: '2码' },
    { key: 3, label: '3码' },
    { key: 4, label: '4码' },
    { key: 5, label: '5码' },
    { key: 6, label: '6码' },
]

const data_m=[
    { key: 1, label: '1码' },
    { key: 2, label: '2码' },
    { key: 3, label: '3码' },
    { key: 4, label: '4码' },
    { key: 5, section: true,label: '5码' },
    { key: 6, label: '6码' },
    { key: 7, label: '7码' },
    { key: 8, label: '8码' },
    { key: 9, label: '9码' },
]

const data_q=[
    { key: 1, label: '1期' },
    { key: 2, label: '2期' },
    { key: 3, section: true,label: '3期' },
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
        onClick:React.PropTypes.func,
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
                Utils.setPickerSelect(dwdata,fn1_w);
                Utils.setPickerSelect(data_m,fn2_m);
                Utils.setPickerSelect(data_q,fn3_q);
                break;
            case 'bdw':
                fn1_w=4;
                fn2_m=2;
                fn3_q=3;
                times=2;
                bonus=1950;
                cur = wf_arr[1];
                Utils.setPickerSelect(bdwdata,fn1_w);
                Utils.setPickerSelect(bdwdata_m,fn2_m);
                Utils.setPickerSelect(data_q,fn3_q);
                break;
            case 'zux':
                fn1_w=2;
                fn2_m=8;
                fn3_q=5;
                times=1;
                bonus=97.5;
                cur = wf_arr[2];
                Utils.setPickerSelect(zuxdata,fn1_w);
                Utils.setPickerSelect(data_m,fn2_m);
                Utils.setPickerSelect(data_q,fn3_q);
                break;
            case 'zhx':
                fn1_w=1;
                fn2_m=8;
                fn3_q=5;
                times=2;
                bonus=195;
                cur = wf_arr[3];
                Utils.setPickerSelect(zhxdata,fn1_w);
                Utils.setPickerSelect(data_m,fn2_m);
                Utils.setPickerSelect(data_q,fn3_q);
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

    gotoVip(){
        this.props.onClick && this.props.onClick(VipchargeView2)
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
                <View style={styles.jpp_hide_view}>
                  <TouchableHighlight
                      underlayColor={'#ea565630'}
                      onPress={()=>this.wfChange('dw')}>
                    <View style={[styles.jpp_hide_view_btn,this.state.wf=='dw'&&styles.jpp_hide_view_btn_selected]}>
                      <Text style={[styles.jpp_hide_view_btn_text,this.state.wf=='dw'&&styles.jpp_hide_view_btn_text_selected]}>定位胆计划</Text>
                        {this.state.wf == 'dw'&&
                        <View style={styles.jpp_hide_view_under}></View>
                        }
                    </View>
                  </TouchableHighlight>
                  <TouchableHighlight
                      underlayColor={'#ea565630'}
                      onPress={()=>this.wfChange('bdw')}>
                    <View style={[styles.jpp_hide_view_btn,this.state.wf=='bdw'&&styles.jpp_hide_view_btn_selected]}>
                      <Text style={[styles.jpp_hide_view_btn_text,this.state.wf=='bdw'&&styles.jpp_hide_view_btn_text_selected]}>胆码计划</Text>
                        {this.state.wf == 'bdw'&&
                        <View style={styles.jpp_hide_view_under}></View>
                        }
                    </View>
                  </TouchableHighlight>
                  <TouchableHighlight
                      underlayColor={'#ea565630'}
                      onPress={()=>this.wfChange('zux')}>
                    <View style={[styles.jpp_hide_view_btn,this.state.wf=='zux'&&styles.jpp_hide_view_btn_selected]}>
                      <Text style={[styles.jpp_hide_view_btn_text,this.state.wf=='zux'&&styles.jpp_hide_view_btn_text_selected]}>组选计划</Text>
                        {this.state.wf == 'zux'&&
                        <View style={styles.jpp_hide_view_under}></View>
                        }
                    </View>
                  </TouchableHighlight>
                  <TouchableHighlight
                      underlayColor={'#ea565630'}
                      onPress={()=>this.wfChange('zhx')}>
                    <View style={[styles.jpp_hide_view_btn,this.state.wf=='zhx'&&styles.jpp_hide_view_btn_selected]}>
                      <Text style={[styles.jpp_hide_view_btn_text,this.state.wf=='zhx'&&styles.jpp_hide_view_btn_text_selected]}>直选计划</Text>
                        {this.state.wf == 'zhx'&&
                        <View style={styles.jpp_hide_view_under}></View>
                        }
                    </View>
                  </TouchableHighlight>
                </View>

                <View style={styles.splitLine_l}></View>
                <View style={styles.jpp_hide_view_fn}>
                  <Text style={{marginTop:5,marginLeft:11,marginRight:5,fontSize:Utils.FONT_SMALL}}>方案设置</Text>
                  <View style={styles.picker_view}>
                      {this.state.wf == 'dw' &&
                      <ModalPicker
                          data={dwdata}
                          initValue={dwdata[this.state.fn1_w-1].label}
                          onChange={(option)=>{ this.setState({fn1_w:option.key}); Utils.setPickerSelect(dwdata,option.key)}} />
                      }

                      {this.state.wf == 'bdw' &&
                      <ModalPicker
                          data={bdwdata}
                          initValue={bdwdata[this.state.fn1_w-1].label}
                          onChange={(option)=>{ this.setState({fn1_w:option.key}); Utils.setPickerSelect(bdwdata,option.key)}} />

                      }
                      {this.state.wf == 'zux' &&
                      <ModalPicker
                          data={zuxdata}
                          initValue={zuxdata[this.state.fn1_w-1].label}
                          onChange={(option)=>{ this.setState({fn1_w:option.key}); Utils.setPickerSelect(zuxdata,option.key)}} />
                      }
                      {this.state.wf == 'zhx' &&
                      <ModalPicker
                          data={zhxdata}
                          initValue={zhxdata[this.state.fn1_w-1].label}
                          onChange={(option)=>{ this.setState({fn1_w:option.key}); Utils.setPickerSelect(zhxdata,option.key)}} />
                      }
                  </View>
                  <View style={styles.picker_view}>
                      {this.state.wf == 'bdw' ?
                          <ModalPicker
                              data={bdwdata_m}
                              initValue={bdwdata_m[this.state.fn2_m-1].label}
                              onChange={(option)=>{ this.setState({fn2_m:option.key}); Utils.setPickerSelect(bdwdata_m,option.key)}} />
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
                        onChange={(option)=>{ this.setState({fn3_q:option.key}); Utils.setPickerSelect(data_q,option.key)}} />
                  </View>

                  <TouchableHighlight
                      underlayColor={'#ea565630'}
                      onPress={() => this.onfinish()}>
                    <View style={{backgroundColor:'#fff',borderRadius:6,width:66*Utils.scale,height:28*Utils.scale,borderWidth:1,marginRight:10,borderColor:'#ffaf48',justifyContent:'center',marginLeft:1,marginTop:1}}>
                      <Text style={{textAlign:'center',color:'#ffaf48',fontSize:12*Utils.scale}}>完成</Text>
                    </View>
                  </TouchableHighlight>
                </View>

                <View style={styles.splitLine_l}></View>
                <TouchableHighlight onPress={()=>this.onPlanPress()} underlayColor="#fff2">
                  <View style={styles.firstPage_history}>
                    <Text style={{marginTop:5,marginLeft:3,marginRight:5,fontSize:Utils.FONT_SMALL}}>选择计划</Text>
                    <Text style={{marginTop:5,fontSize:Utils.FONT_SMALL,color:'#000',flex:2,textAlign:'left'}}>当前:({this.state.planValue.jhfaName}:{this.state.planValue.winRate}%)</Text>
                    <Text style={{marginTop:5,marginLeft:3,marginRight:5,fontSize:Utils.FONT_SMALL}}>点击选择计划</Text>
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

                      <View style={{marginLeft:5,justifyContent:'space-around',flex:3}}>
                          <TouchableHighlight onPress={()=>this.gotoVip()} underlayColor="#fff2">
                              <View style={{flexDirection:'row',justifyContent:'space-around',flex:3}}>
                                  <Text style={{flex:2,marginLeft:10,alignSelf:'center',textAlign:'left',color:'#f00',fontSize:12*Utils.scale}}>{this.state.firstPlanResult ? this.formatPlanNumber(this.state.firstPlanResult) : '请开通会员'}</Text>
                                  <Text style={{flex:1,alignSelf:'center',textAlign:'left',color:'#f00',marginRight:5,fontSize:12*Utils.scale}}>投注中...</Text>
                              </View>
                         </TouchableHighlight>
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
