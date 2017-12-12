/**
 * 精品计划--
 */

'use strict';
import React from 'react';
import {
    Text,
    View,
    TouchableHighlight,
} from 'react-native';

import styles from './../stylecpxzs';
import Utils from './../Utils';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class PlanItemView extends React.Component{

  static propTypes={
    data:React.PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state={
      showDesc:false,
    }
  }

  onItemPress(){
    this.setState({
      showDesc:!this.state.showDesc,
    })
  }

  descPeriod(period:string){
    var periodstr = period+'';
    return periodstr.substring(periodstr.length-3,periodstr.length);//默认截取最后3位 20161230020
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

  render(){
    var value = Utils.formatNumber(this.props.data.amount,2);
    var hideview=[];
    for (var i=0;i<this.props.data.caipiaoList.length;i++) {
        var item = this.props.data.caipiaoList[i];
        var periodshow = this.descPeriod(item.period);
        hideview.push(
          <View style={styles.rowStyle} key={i}>
            <Text style={styles.plan_item_desc}>{periodshow}</Text>
            <Text style={styles.plan_center_row_w_desc}>{item.result}</Text>
            {this.props.data.status && i==0?
              <Text style={[styles.plan_center_desc,{color:'#f00'}]}>中奖</Text>
              :
              <Text style={styles.plan_center_desc}>不中</Text>
            }
          </View>
        );
    }
  return(
      <View>
         <TouchableHighlight
          underlayColor="#fff1"
          onPress={() => this.onItemPress()}>
           <View style={styles.rowStyle} >
             <Text style={styles.plan_item}>{this.props.data.item} <Icon name={'long-arrow-down'} size={10*Utils.scale} color={'#f00'}/></Text>
             <Text style={styles.plan_center_row_w}>{this.props.data.resultNumber}</Text>
             <Text style={styles.plan_center_row_w}>{this.formatPlanNumber(this.props.data.planNum)}</Text>
             {this.props.data.status?
               <Text style={[styles.plan_center_row,{color:'#f00'}]}>中奖</Text>
               :
               <Text style={styles.plan_center_row}>不中</Text>
             }
           </View>
         </TouchableHighlight>
         {this.state.showDesc &&
           <View style={{backgroundColor:'#eee'}}>
           {hideview}
           </View>
        }
      </View>
         );
  }
}
