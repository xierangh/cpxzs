/**
 * 四星做号工具
 */
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
import zhgj from './zhgj'

//获得杀012的号码
function gets012arr(len:number,barr:array){
  var retarr=[];
  if (len == 4) {
    for (var i = 0; i < barr.length; i++) {
      for (var j = 0; j < barr.length; j++) {
        for (var k = 0; k < barr.length; k++) {
            for (var m = 0; m < barr.length; m++) {
                retarr.push(barr[i] + barr[j] + barr[k] + barr[m]);
            }
        }
      }
    }
  }
  return retarr;
}

var zhgjType= 4;
var itemspecial=['豹子','不连','2连','3连','4连','散号','对子号','三同号','两个对子'];
export default class Notool4View extends React.Component{

  constructor(props){
    super(props)
    this.state={
      loaded:true,
      kill_period_number:'100',
      maxNum:36,
      items012:gets012arr(zhgjType,['0','1','2']),//['00','01','02','10','11','12','20','21','22'],
      itemspecial:itemspecial,
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
        this.refs.daxiao.setSelected([]);
        this.refs.jiou.setSelected([]);
        this.refs.zhihe.setSelected([]);
        break;
    case 'danzu':
        this.refs.dz1.setSelected([]);
        this.refs.dzs1.setSelected([]);
        this.refs.dz2.setSelected([]);
        this.refs.dzs2.setSelected([]);
        this.refs.dz3.setSelected([]);
        this.refs.dzs3.setSelected([]);
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
        this.refs.daxiao.setSelected([]);
        this.refs.jiou.setSelected([]);
        this.refs.zhihe.setSelected([]);

        this.refs.dz1.setSelected([]);
        this.refs.dzs1.setSelected([]);
        this.refs.dz2.setSelected([]);
        this.refs.dzs2.setSelected([]);
        this.refs.dz3.setSelected([]);
        this.refs.dzs3.setSelected([]);
        this.setState({
              resultSet:[],
          })
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
      var erXingArr = zhgj.siXing();
      erXingArr = zhgj.danMa(erXingArr, this.refs.dm.getSelected());

      //杀定位
      erXingArr = zhgj.removeDingWei(erXingArr,this.refs.sdw2.getSelected(),1);
      erXingArr = zhgj.removeDingWei(erXingArr,this.refs.sdw3.getSelected(),2);
      erXingArr = zhgj.removeDingWei(erXingArr,this.refs.sdw4.getSelected(),3);
      erXingArr = zhgj.removeDingWei(erXingArr,this.refs.sdw5.getSelected(),4);

      //和尾，跨度，和值
      erXingArr = zhgj.heWei(erXingArr, this.refs.hewei.getSelected());
      erXingArr = zhgj.removekKuaDu(erXingArr, this.refs.kuadu.getSelected());
      erXingArr = zhgj.removeSum(erXingArr, this.refs.hezhi.getSelected());

      //012
      erXingArr = zhgj.removeZeroOneTwo(erXingArr, this.refs.s012.getSelected());

      //胆组
      erXingArr = zhgj.danZu(erXingArr, this.refs.dz1.getSelected(), this.refs.dzs1.getSelected());
      erXingArr = zhgj.danZu(erXingArr, this.refs.dz2.getSelected(), this.refs.dzs2.getSelected());
      erXingArr = zhgj.danZu(erXingArr, this.refs.dz3.getSelected(), this.refs.dzs3.getSelected());

      //大小 奇偶 质合
      erXingArr = zhgj.removeBigSmall(erXingArr, this.refs.daxiao.getSelected());
      erXingArr = zhgj.removeOddEven(erXingArr, this.refs.jiou.getSelected());
      erXingArr = zhgj.removePrimeCompos(erXingArr, this.refs.zhihe.getSelected());

      //特别排除
      var specArr = this.refs.sspecial.getSelected();
      erXingArr = zhgj.removeSpec(erXingArr, specArr);

      this.setState({
          resultSet:erXingArr
      })
  }

  turnZuxuan(){
        this.setState({
            resultSet:zhgj.turnZuXuan(this.state.resultSet)
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

    getShowData(){
        var data = this.state.resultSet.join(' ');
        var maxlen = 40000;
        if(data.length > maxlen){
            return data.substring(0,maxlen)+'   号码太多，只显示部分号码';
        }
        return data;
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

          <TouchableHighlight
            onPress={()=>this.clearSelect('sdm')}
            underlayColor={'#ea565630'}
            >
            <View style={styles.notool_sub_title_right}>
              <Text style={styles.notool_sub_title_right_text}>清除</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={{flexDirection:'row',paddingVertical:5}}>
            <Text style={styles.notool_text_left}>胆码:</Text>
            <NotoolRowView
              ref={'dm'}
              selected={[]}
              />
        </View>

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
            <View style={{flexDirection:'row',paddingTop:5}}>
                <Text style={styles.notool_text_left}>千位</Text>
                <NotoolRowView
                    ref='sdw2'
                />
            </View>
            <View style={{flexDirection:'row'}}>
                <Text style={styles.notool_text_left_yilou}>遗漏</Text>
                <NotoolRowYiLouView
                    selected={this.state.omession.dCurrOmission.countList}
                />
            </View>
        </View>

        <View>
          <View style={{flexDirection:'row',paddingTop:5}}>
              <Text style={styles.notool_text_left}>百位</Text>
              <NotoolRowView
                ref='sdw3'
                />
          </View>
          <View style={{flexDirection:'row'}}>
              <Text style={styles.notool_text_left_yilou}>遗漏</Text>
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
            <Text style={styles.notool_text_left_yilou}>遗漏</Text>
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
        <View style={{flexDirection:'row',paddingBottom:5}}>
            <Text style={styles.notool_text_left_yilou}>遗漏</Text>
            <NotoolRowYiLouView
              selected={this.state.omession.aCurrOmission.countList}
              />
        </View>

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
        <View style={{flexDirection:'row',paddingTop:5,paddingBottom:3}}>
            <Text style={styles.notool_text_left}>和尾</Text>
            <NotoolRowView
              ref={'hewei'}
              />
        </View>
        <View style={{flexDirection:'row',paddingBottom:3}}>
            <Text style={styles.notool_text_left}>跨度</Text>
            <NotoolRowView
              ref={'kuadu'}
              />
        </View>
        <View style={{flexDirection:'row',paddingBottom:5}}>
            <Text style={styles.notool_text_left}>和值</Text>
            <NotoolRowView
              ref={'hezhi'}
              maxNum={this.state.maxNum}
              />
        </View>

        <View>
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
        <View style={{marginLeft:10}}>
            <NotoolRowText2ViewOld
              ref='daxiao'
              items={gets012arr(zhgjType,['大','小'])}
              />
            <NotoolRowText2ViewOld
                ref='jiou'
                items={gets012arr(zhgjType,['奇','偶'])}
            />
            <NotoolRowText2ViewOld
                ref='zhihe'
                items={gets012arr(zhgjType,['质','合'])}
            />
        </View>

        <View style={styles.notool_sub_title}>
            <View style={styles.notool_sub_title_start}></View>
            <Text style={styles.notool_sub_title_left}>胆组</Text>
            <TouchableHighlight
                onPress={()=>this.clearSelect('danzu')}
                underlayColor={'#ea565630'}
            >
                <View style={styles.notool_sub_title_right}>
                    <Text style={styles.notool_sub_title_right_text}>清除</Text>
                </View>
            </TouchableHighlight>
        </View>
        <View>
            <View style={{flexDirection:'row',paddingTop:5}}>
                <Text style={styles.notool_text_left}>组一</Text>
                <NotoolRowView
                    ref='dz1'
                />
            </View>
            <View style={{flexDirection:'row',paddingTop:5}}>
                <Text style={styles.notool_text_left}>胆数</Text>
                <NotoolRowView
                    ref='dzs1'
                    maxNum={zhgjType}
                />
            </View>

            <View style={{flexDirection:'row',paddingTop:5}}>
                <Text style={styles.notool_text_left}>组二</Text>
                <NotoolRowView
                    ref='dz2'
                />
            </View>
            <View style={{flexDirection:'row',paddingTop:5}}>
                <Text style={styles.notool_text_left}>胆数</Text>
                <NotoolRowView
                    ref='dzs2'
                    maxNum={zhgjType}
                />
            </View>

            <View style={{flexDirection:'row',paddingTop:5}}>
                <Text style={styles.notool_text_left}>组三</Text>
                <NotoolRowView
                    ref='dz3'
                />
            </View>
            <View style={{flexDirection:'row',paddingTop:5}}>
                <Text style={styles.notool_text_left}>胆数</Text>
                <NotoolRowView
                    ref='dzs3'
                    maxNum={zhgjType}
                />
            </View>
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
                {this.getShowData()}
            </Text>
            :
            <LoadingView />
          }

        </ScrollView>
    </ScrollView>
    );
  }

}
