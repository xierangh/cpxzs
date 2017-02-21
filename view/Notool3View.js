'use strict';
import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    TouchableHighlight,
    StyleSheet,
    ScrollView,
    TextInput,
    Clipboard,
} from 'react-native';

import styles from './stylecpxzs';
import Utils from './Utils';
import LoadingView from './comp/Loading'
import NotoolRowView from './comp/NotoolRowView'
import NotoolRowYiLouView from './comp/NotoolRowYiLouView'
import NotoolRowText2ViewOld from './comp/NotoolRowText2ViewOld'
import CheckBoxsView from './comp/CheckBoxsView'

//获得杀012的号码
function gets012arr(len:number,barr:array){
  var retarr=[];
  if (len == 3) {
    for (var i = 0; i < barr.length; i++) {
      for (var j = 0; j < barr.length; j++) {
        for (var k = 0; k < barr.length; k++) {
          retarr.push(barr[i]+barr[j]+barr[k]);
        }
      }
    }
  }
  return retarr;
}

var zhgjType= 3;
export default class Notool3View extends React.Component{

  constructor(props){
    super(props)
    this.state={
      loaded:true,
      kill_period_number:'100',
      maxNum:27,
      items012:gets012arr(zhgjType,['0','1','2']),//['00','01','02','10','11','12','20','21','22'],
      itemddz:gets012arr(zhgjType,['大','小']).concat(gets012arr(zhgjType,['奇','偶']),gets012arr(zhgjType,['质','合'])),//['大大','大小','小大','小小','奇奇','奇偶','偶奇','偶偶','质质','质合','合质','合合'],
      itemspecial:['豹子','组三','组六','不连','2连','3连','下山','上山','凸形','凹形'],
      itemspecialSelect:[],
      resultSet:[],
      zhgjType:zhgjType,
      omession:this.props.omession,
    }
  }

  componentWillReceiveProps(nextProps) {
    // console.log("checkbox接收到新参数啦 ");
    console.log(nextProps);
    this.setState({
      omession: nextProps.omession
    });
  }

  clearSelect(type:string){
    switch (type) {
      case 'sdm':
        this.refs.dm.setSelected([]);
        break;
      case 'sdw':
        this.refs.sdw3.setSelected([]);
        this.refs.sdw4.setSelected([]);
        this.refs.sdw5.setSelected([]);
        break;
      case 'shkh':
        this.refs.kuadu.setSelected([]);
        this.refs.hewei.setSelected([]);
        this.refs.hezhi.setSelected([]);
        break;
      case 'sspecial':
        this.refs.sspecial.setSelected([]);
        break;
      case 's012':
        this.refs.s012.setSelected([]);
        break;
      case 'sddz':
        this.refs.sddz.setSelected([]);
        break;
      case 'all':
        this.refs.dm.setSelected([]);
        if (this.state.zhgjType >4) {
          this.refs.sdw1.setSelected([]);
        }
        if (this.state.zhgjType >3) {
          this.refs.sdw2.setSelected([]);
        }
        if (this.state.zhgjType >2) {
          this.refs.sdw3.setSelected([]);
        }
        this.refs.sdw4.setSelected([]);
        this.refs.sdw5.setSelected([]);

        this.refs.kuadu.setSelected([]);
        this.refs.hewei.setSelected([]);
        this.refs.hezhi.setSelected([]);

        if (this.state.zhgjType >2) {
          this.refs.sspecial.setSelected([]);
        }
        this.refs.s012.setSelected([]);
        this.refs.sddz.setSelected([]);
        break;
      default:

    }
  }

  getzhgjTypeName(){
    var zhgjType = this.state.zhgjType-1;
    var zhgjTypeName = '';
    switch (zhgjType) {
      case 1:
        zhgjTypeName =  'twoStar';
        break;
      case 2:
        zhgjTypeName =  'threeStar';
        break;
      case 3:
        zhgjTypeName =  'fourStar';
        break;
      case 4:
        zhgjTypeName =  'fiveStar';
        break;
      default:
        zhgjTypeName =  'twoStar';
    }
    return zhgjTypeName;
  }

  setDmValue(value:array){
    this.refs.dm.setSelected(value);
  }

  //数组转化为字符串
  arrayToStr(arr:array){
    return arr.join(',');
  }

  getBigSmall(arr:array,farr:array){
    var retarr=[];
    for (var i = 0; i < arr.length; i++) {
      for (var k = 0; k < farr.length; k++) {
        if (arr[i].indexOf(farr[k]) > 0) {
          retarr.push(arr[i]);
          break;
        }
      }
    }
    console.log(retarr.join(' '));
    return retarr;
  }

  //是否包含特殊形态
  isContainSpecial(spstr:string,sparr:array){
    // var sparr = this.state.itemspecialSelect;
    for (var i = 0; i < sparr.length; i++) {
      if (sparr[i] == spstr) {
        return true;
      }
    }
    return false;
  }

  createNo(){
    var sparr = this.refs.sspecial.getSelected();

    console.log(this.refs.dm.getSelected());
    var keep = 'keep';
    var remove = 'remove';

    var param= '';
    //类型
    param =param + 'zhgjType'+'='+this.getzhgjTypeName()+'&';

    //胆码，
    param =param + 'danMaNum'+'='+this.arrayToStr(this.refs.dm.getSelected())+'&';
    param =param + 'danMaKeepOrDel'+'='+keep+'&';
    //个十百千万
    param =param + 'firstNum'+'='+this.arrayToStr(this.refs.sdw5.getUnSelected())+'&';
    param =param + 'firstNumKeepOrDel'+'='+keep+'&';
    param =param + 'secondNum'+'='+this.arrayToStr(this.refs.sdw4.getUnSelected())+'&';
    param =param + 'secondNumKeepOrDel'+'='+keep+'&';
    if (this.state.zhgjType >2) {
      param =param + 'thirdNum'+'='+this.arrayToStr(this.refs.sdw3.getUnSelected())+'&';
      param =param + 'thirdNumKeepOrDel'+'='+keep+'&';
    }
    if (this.state.zhgjType >3) {
      param =param + 'fourthNum'+'='+this.arrayToStr(this.refs.sdw2.getUnSelected())+'&';
      param =param + 'fourthNumKeepOrDel'+'='+keep+'&';
    }
    if (this.state.zhgjType >4) {
      param =param + 'fifthNum'+'='+this.arrayToStr(this.refs.sdw1.getUnSelected())+'&';
      param =param + 'fifthNumKeepOrDel'+'='+keep+'&';
    }
    //跨度，尾和，和值
    param =param + 'spanNum'+'='+this.arrayToStr(this.refs.kuadu.getSelected())+'&';
    param =param + 'spanKeepOrDel'+'='+keep+'&';
    param =param + 'endValueNum'+'='+this.arrayToStr(this.refs.hewei.getSelected())+'&';
    param =param + 'endValueKeepOrDel'+'='+keep+'&';
    param =param + 'sumValueNum'+'='+this.arrayToStr(this.refs.hezhi.getUnSelected())+'&';
    param =param + 'sumValueKeepOrDel'+'='+keep+'&';
    //大小／奇偶／质合
    param =param + 'bigSmallNum'+'='+this.arrayToStr(Utils.getBigSmall(this.refs.sddz.getSelected(),['大','小']))+'&';
    param =param + 'bigSmallKeepOrDel'+'='+remove+'&';
    param =param + 'evenOddNum'+'='+this.arrayToStr(Utils.getBigSmall(this.refs.sddz.getSelected(),['奇','偶']))+'&';
    param =param + 'evenOddKeepOrDel'+'='+remove+'&';
    param =param + 'primeCompositeNum'+'='+this.arrayToStr(Utils.getBigSmall(this.refs.sddz.getSelected(),['质','合']))+'&';
    param =param + 'primeCompositeKeepOrDel'+'='+remove+'&';
    //012
    param =param + 'approachNum'+'='+this.arrayToStr(this.refs.s012.getSelected())+'&';
    param =param + 'approachKeepOrDel'+'='+remove+'&';


    param =param + 'bigSmallPercent'+'='+'&';
    param =param + 'bigSmallPercentKeepOrDel'+'='+keep+'&';
    param =param + 'oddEvenPercent'+'='+'&';
    param =param + 'oddEvenPercentKeepOrDel'+'='+keep+'&';
    param =param + 'primeCompositePercent'+'='+'&';
    param =param + 'primeCompositePercentKeepOrDel'+'='+keep+'&';

    //上山／下山
    param =param + 'shangShan'+'='+this.isContainSpecial('上山',sparr)+'&';
    param =param + 'shangShanKeepOrDel'+'='+remove+'&';
    param =param + 'xiaShan'+'='+this.isContainSpecial('下山',sparr)+'&';
    param =param + 'xiaShanKeepOrDel'+'='+remove+'&';

    var consecutive=[];
    if(this.isContainSpecial('不连',sparr)){
      consecutive.push(1);
    }
    if(this.isContainSpecial('2连',sparr)){
      consecutive.push(2);
    }
    if(this.isContainSpecial('3连',sparr)){
      consecutive.push(3);
    }

    //三连
    param =param + 'consecutive'+'='+consecutive.join(',')+'&';
    param =param + 'abcde'+'='+'&';
    param =param + 'abcdeKeepOrDel'+'='+remove+'&';


    param =param + 'minNum'+'='+'&';
    param =param + 'minNumKeepOrDel'+'='+keep+'&';
    param =param + 'maxNum'+'='+'&';
    param =param + 'maxNumKeepOrDel'+'='+keep+'&';

    param =param + 'acValue'+'='+'&';
    param =param + 'acValueKeepOrDel'+'='+remove+'&';
    //凸形
    param =param + 'convex'+'='+this.isContainSpecial('凸形',sparr)+'&';
    param =param + 'convexKeepOrDel'+'='+remove+'&';
    param =param + 'sunken'+'='+this.isContainSpecial('凹形',sparr)+'&';
    param =param + 'sunkenKeepOrDel'+'='+remove+'&';
    //n形
    param =param + 'nPattern'+'='+'&';
    param =param + 'nPatternKeepOrDel'+'='+remove+'&';
    param =param + 'notNPattern'+'='+'&';
    param =param + 'notNPatternKeepOrDel'+'='+remove+'&';

    //
    param =param + 'removeBaozi'+'='+this.isContainSpecial('豹子',sparr)+'&';
    param =param + 'removeSanHao'+'='+this.isContainSpecial('散号',sparr)+'&';
    param =param + 'removeDuizi'+'='+this.isContainSpecial('对子号',sparr)+'&';
    param =param + 'removeSanTonghao'+'='+this.isContainSpecial('三同号',sparr)+'&';
    param =param + 'removeTwoDuizi'+'='+this.isContainSpecial('两个对子',sparr)+'&';
    param =param + 'removeGroupThree'+'='+this.isContainSpecial('组三',sparr)+'&';
    param =param + 'removeGroupSix'+'='+this.isContainSpecial('组六',sparr)+'&';

    param =param + 'bigNum'+'='+'&';
    param =param + 'bigNumKeepOrDel'+'='+keep+'&';
    param =param + 'primeNum'+'='+'&';
    param =param + 'primeNumKeepOrDel'+'='+keep+'&';
    param =param + 'oddNum'+'='+'&';
    param =param + 'oddNumKeepOrDel'+'='+keep+'&';

    var chuDanNum = this.refs.chuDanNum.getSelectedIndex()+1;
    console.log('chuDanNum='+chuDanNum);
    param =param + 'chuDanNum'+'='+chuDanNum+'&';
    param =param + 'chuDanNumKeepOrDel'+'='+keep+'&';

    param =param + 'danZuNum'+'='+'&';
    param =param + 'danZuNumCount'+'='+'&';
    param =param + 'groupBasicNum'+'='+'&';
    param =param + 'groupNumType'+'='+'&';

     param =param + 'zuXuanType'+'='+'zuXuan120'+'&';
     param =param + 'specilFirstNum'+'='+'&';
     param =param + 'specilSecondNum'+'='+'';

    // console.log(paramjson);
    // var parameter = JSON.stringify(paramjson);

    this.setState({
      loaded:false,
    })
    Utils.post('zhgj/zhgjGenerateNum',param)
    .then((jsonData)=>{
          this.setState({
            loaded:true,
          })
          if(jsonData){
            // console.log('jsondata:'+JSON.stringify(jsonData));
            if(jsonData.success){
                //jsonData.resultSet;
                this.setState({
                  resultSet:jsonData.resultSet
                })
              }else{
                Utils.showAlert('错误提示','生成号码失败');
               }
          }
          })
  }

  turnZuxuan(){
    this.setState({
      loaded:false,
    })
    Utils.post('zhgj/turnZuXuan','numbers='+this.state.resultSet.join("+"))
    .then((jsonData)=>{
          this.setState({
            loaded:true,
          })
          if(jsonData){
            // console.log('jsondata:'+JSON.stringify(jsonData));
            if(jsonData.success){
                //jsonData.resultSet;
                this.setState({
                  resultSet:jsonData.data
                })
              }else{
                Utils.showAlert('错误提示','生成号码失败');
               }
          }
          })
  }

  reverse(){
    var param='';
    param = param+'numbers='+this.state.resultSet.join(",")+'&';
    param = param+'reverseType='+this.getzhgjTypeName();

    this.setState({
      loaded:false,
    })

    Utils.post('zhgj/reverse',param)
    .then((jsonData)=>{
          this.setState({
            loaded:true,
          })
          if(jsonData){
            // console.log('jsondata:'+JSON.stringify(jsonData));
            if(jsonData.success){
                //jsonData.resultSet;
                this.setState({
                  resultSet:jsonData.data
                })
              }else{
                Utils.showAlert('错误提示','生成号码失败');
               }
          }
          })
  }

  copyno(){
      if(this.state.resultSet.length <= 0){
          Utils.showAlert('','请先生成号码')
          return;
      }
    Clipboard.setString(this.state.resultSet.join(' '));
    Utils.showAlert('','拷贝成功');
  }

  render(){
    return(

    <ScrollView
        style={{flex:1,marginTop:0}}
        automaticallyAdjustContentInsets={false}
        >
        <View style={styles.splitLine}></View>
        <View style={styles.notool_sub_title}>
          <View style={styles.notool_sub_title_start}></View>
          <Text style={styles.notool_sub_title_left}>胆码</Text>

          {/*
          <TouchableHighlight
            onPress={()=>this.setDmValue([5,6,7,8,9])}
            underlayColor={'#ea565630'}
            >
            <Text style={styles.notool_sub_title_center}>大</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={()=>this.setDmValue([0,1,2,3,4])}
            underlayColor={'#ea565630'}
            >
            <Text style={styles.notool_sub_title_center}>小</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={()=>this.setDmValue([1,3,5,7,9])}
            underlayColor={'#ea565630'}
            >
            <Text style={styles.notool_sub_title_center}>单</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={()=>this.setDmValue([0,2,4,6,8])}
            underlayColor={'#ea565630'}
            >
            <Text style={styles.notool_sub_title_center}>双</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={()=>this.setDmValue([5,6,7,8,9])}
            underlayColor={'#ea565630'}
            >
            <Text style={styles.notool_sub_title_center}>012</Text>
          </TouchableHighlight>
          */}
          <TouchableHighlight
            onPress={()=>this.clearSelect('sdm')}
            underlayColor={'#ea565630'}
            >
            <View style={styles.notool_sub_title_right}>
              <Text style={styles.notool_sub_title_right_text}>清除</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={{flexDirection:'row'}}>
            <Text style={styles.notool_text_left}>胆码:</Text>
            <NotoolRowView
              ref={'dm'}
              selected={[]}
              />
        </View>
        <View style={{flexDirection:'row'}}>
            <Text style={styles.notool_text_left}>至少出胆数:</Text>
            <CheckBoxsView
              rowstyle={{marginTop:12}}
              ref={'chuDanNum'}
              items={['1个','2个','3个']}
              />
        </View>

        {/*
        <View style={styles.splitLine}></View>
        <View style={styles.notool_sub_title}>
          <View style={styles.notool_sub_title_start}></View>
          <Text style={styles.notool_sub_title_left}>杀历史开奖号</Text>
        </View>
        <View style={{flexDirection:'row',padding:10}}>
          <Text>杀前</Text>
          <TextInput style={{color:'#000',borderWidth:1,borderColor:'#f00',width:50,fontSize:14}}
              autoCorrect={false}
              onChangeText={(text) => this.setState({kill_period_number:text})}
              value={this.state.kill_period_number}
              keyboardType='numeric'
              placeholderTextColor='#929292'></TextInput>
          <Text>期开奖号</Text>
          <Text style={{color:'#666'}}>(注:期数可以手动输入)</Text>
        </View>
        */}

        <View style={styles.splitLine}></View>
        <View style={styles.notool_sub_title}>
          <View style={styles.notool_sub_title_start}></View>
          <Text style={styles.notool_sub_title_left}>杀定位</Text>
          <TouchableHighlight
            onPress={()=>this.clearSelect('sdw')}
            underlayColor={'#ea565630'}
            >
            <View style={styles.notool_sub_title_right}>
              <Text style={styles.notool_sub_title_right_text}>清除</Text>
            </View>
          </TouchableHighlight>
        </View>

        <View>
          <View style={{flexDirection:'row'}}>
              <Text style={styles.notool_text_left}>百位</Text>
              <NotoolRowView
                ref='sdw3'
                />
          </View>
          <View style={{flexDirection:'row'}}>
              <Text style={styles.notool_text_left}>遗漏</Text>
              <NotoolRowYiLouView
                selected={this.state.omession.cCurrOmission.countList}
                />
          </View>
        </View>

        <View style={{flexDirection:'row'}}>
            <Text style={styles.notool_text_left}>十位</Text>
            <NotoolRowView
              ref='sdw4'
              />
        </View>
        <View style={{flexDirection:'row'}}>
            <Text style={styles.notool_text_left}>遗漏</Text>
            <NotoolRowYiLouView
              selected={this.state.omession.bCurrOmission.countList}
              />
        </View>

        <View style={{flexDirection:'row'}}>
            <Text style={styles.notool_text_left}>个位</Text>
            <NotoolRowView
              ref='sdw5'
              />
        </View>
        <View style={{flexDirection:'row'}}>
            <Text style={styles.notool_text_left}>遗漏</Text>
            <NotoolRowYiLouView
              selected={this.state.omession.aCurrOmission.countList}
              />
        </View>

        <View style={styles.splitLine}></View>
        <View style={styles.notool_sub_title}>
          <View style={styles.notool_sub_title_start}></View>
          <Text style={styles.notool_sub_title_left}>杀和尾/跨度/和值</Text>
          <TouchableHighlight
            onPress={()=>this.clearSelect('shkh')}
            underlayColor={'#ea565630'}
            >
            <View style={styles.notool_sub_title_right}>
              <Text style={styles.notool_sub_title_right_text}>清除</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={{flexDirection:'row'}}>
            <Text style={styles.notool_text_left}>和尾</Text>
            <NotoolRowView
              ref={'hewei'}
              />
        </View>
        <View style={{flexDirection:'row'}}>
            <Text style={styles.notool_text_left}>跨度</Text>
            <NotoolRowView
              ref={'kuadu'}
              />
        </View>
        <View style={{flexDirection:'row'}}>
            <Text style={styles.notool_text_left}>和值</Text>
            <NotoolRowView
              ref={'hezhi'}
              maxNum={this.state.maxNum}
              />
        </View>

        <View>
          <View style={styles.splitLine}></View>
          <View style={styles.notool_sub_title}>
            <View style={styles.notool_sub_title_start}></View>
            <Text style={styles.notool_sub_title_left}>杀特殊形态</Text>
            <TouchableHighlight
              onPress={()=>this.clearSelect('sspecial')}
              underlayColor={'#ea565630'}
              >
              <View style={styles.notool_sub_title_right}>
                <Text style={styles.notool_sub_title_right_text}>清除</Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={{flexDirection:'row',marginLeft:10}}>
              <NotoolRowText2ViewOld
                ref='sspecial'
                items={this.state.itemspecial}
                />
          </View>
      </View>

        <View style={styles.splitLine}></View>
        <View style={styles.notool_sub_title}>
          <View style={styles.notool_sub_title_start}></View>
          <Text style={styles.notool_sub_title_left}>杀012路</Text>
          <TouchableHighlight
            onPress={()=>this.clearSelect('s012')}
            underlayColor={'#ea565630'}
            >
              <View style={styles.notool_sub_title_right}>
                <Text style={styles.notool_sub_title_right_text}>清除</Text>
              </View>
          </TouchableHighlight>
        </View>
        <View style={{flexDirection:'row',marginLeft:10}}>
            <NotoolRowText2ViewOld
              ref='s012'
              items={this.state.items012}
              />
        </View>

        <View style={styles.splitLine}></View>
        <View style={styles.notool_sub_title}>
          <View style={styles.notool_sub_title_start}></View>
          <Text style={styles.notool_sub_title_left}>杀大小/单双/质合</Text>
          <TouchableHighlight
            onPress={()=>this.clearSelect('sddz')}
            underlayColor={'#ea565630'}
            >
            <View style={styles.notool_sub_title_right}>
            <Text style={styles.notool_sub_title_right_text}>清除</Text>
          </View>
          </TouchableHighlight>
        </View>
        <View style={{flexDirection:'row',marginLeft:10}}>
            <NotoolRowText2ViewOld
              ref='sddz'
              items={this.state.itemddz}
              />
        </View>

        <View style={styles.splitLine}></View>
        <View style={styles.notool_btn_view}>
          <TouchableHighlight
            underlayColor={'#f00'}
            onPress={()=>this.createNo()}
            >
            <View style={styles.notool_btn}>
              <Text style={styles.notool_btn_text}>生成号码</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={()=>this.turnZuxuan()}
            underlayColor={'#ea565630'}
            >
            <View style={styles.notool_btn}>
              <Text style={styles.notool_btn_text}>转为组选</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={()=>this.reverse()}
            underlayColor={'#ea565630'}
            >
            <View style={styles.notool_btn}>
            <Text style={styles.notool_btn_text}>立即反选</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={()=>this.copyno()}
            underlayColor={'#ea565630'}
            >
            <View style={styles.notool_btn}>
            <Text style={styles.notool_btn_text}>复制号码</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={()=>this.clearSelect('all')}
            underlayColor={'#ea565630'}
            >
            <View style={styles.notool_btn}>
            <Text style={styles.notool_btn_text}>全部清空</Text>
            </View>
          </TouchableHighlight>
        </View>

        <Text style={styles.notool_result_number}>共:{this.state.resultSet.length}注</Text>
        <ScrollView
          style={{height:500}}
          >
          {this.state.loaded ?
            <Text
              ref='resultSet'
              style={styles.notool_result_text}>
                {this.state.resultSet.join(' ')}
            </Text>
            :
            <LoadingView />
          }

        </ScrollView>
    </ScrollView>
    );
  }

}
