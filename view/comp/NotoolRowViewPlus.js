//做号工具中一行数字0-9,带标识和按钮 全 单 双 大 小 清

import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
} from 'react-native';

import _ from 'lodash'
import Utils from './../Utils'
import NumberCircle from './NumberCircle'
import NumberselectBtn from './NumberselectBtn'


export default class NotoolRowViewPlus extends React.Component{

  propsTypes={
    selected:React.PropTypes.array,
    title:React.PropTypes.string,
  }
  //所有实例都用同一个
  static defaultProps={
    maxNum:9,
  }

  constructor(props){
    super(props)
    var selected = [];//默认不选
    if(this.props.selected){
      selected = this.props.selected;
    }
    this.state={
      selected:selected,
      maxNum:this.props.maxNum+1,
    }
  }

  getSelected(){
    return this.state.selected;
  }

  getUnSelected(){
    var unselected=[];
    for (var ref in this.refs) {
      // console.log(this.refs[ref].props.number);
      var selected = this.refs[ref].getSelected();
      if(!selected){
        unselected.push(this.refs[ref].props.number);
      }
    }
    return unselected;
  }

  setSelected(nselected:array){
    this.setState({
      selected:nselected,
    })

    for (var ref in this.refs) {
      // console.log(this.refs[ref].props.number);
      var selected = _.includes(nselected,this.refs[ref].props.number);
      this.refs[ref].setIsSelected(selected);
    }
  }

  //当号码被点击后修改当前选中的数字
  onPress(number,status){
    var tmp = this.state.selected;
    if(status){
      tmp.push(number);
    }else {
      _.remove(tmp,function(n){ return n==number});
    }

    this.setState({
      selected:tmp,
    })
    console.log(this.state.selected);
  }

    selectNumber(type){
      switch (type){
          case 'all':
            this.setSelected([0,1,2,3,4,5,6,7,8,9]);
            this.refs.all.setIsSelected(true);
            this.refs.big.setIsSelected(false);
            this.refs.small.setIsSelected(false);
            this.refs.odd.setIsSelected(false);
            this.refs.even.setIsSelected(false);
            this.refs.clear.setIsSelected(false);
            break;
          case 'big':
              this.setSelected([5,6,7,8,9]);
              this.refs.all.setIsSelected(false);
              this.refs.big.setIsSelected(true);
              this.refs.small.setIsSelected(false);
              this.refs.odd.setIsSelected(false);
              this.refs.even.setIsSelected(false);
              this.refs.clear.setIsSelected(false);
              break;
          case 'small':
              this.setSelected([0,1,2,3,4]);
              this.refs.all.setIsSelected(false);
              this.refs.big.setIsSelected(false);
              this.refs.small.setIsSelected(true);
              this.refs.odd.setIsSelected(false);
              this.refs.even.setIsSelected(false);
              this.refs.clear.setIsSelected(false);
              break;
          case 'odd':
              this.setSelected([1,3,5,7,9]);
              this.refs.all.setIsSelected(false);
              this.refs.big.setIsSelected(false);
              this.refs.small.setIsSelected(false);
              this.refs.odd.setIsSelected(true);
              this.refs.even.setIsSelected(false);
              this.refs.clear.setIsSelected(false);
              break;
          case 'even':
              this.setSelected([0,2,4,6,8]);
              this.refs.all.setIsSelected(false);
              this.refs.big.setIsSelected(false);
              this.refs.small.setIsSelected(false);
              this.refs.odd.setIsSelected(false);
              this.refs.even.setIsSelected(true);
              this.refs.clear.setIsSelected(false);
              break;
          case 'clear':
              this.setSelected([]);
              this.refs.all.setIsSelected(false);
              this.refs.big.setIsSelected(false);
              this.refs.small.setIsSelected(false);
              this.refs.odd.setIsSelected(false);
              this.refs.even.setIsSelected(false);
              this.refs.clear.setIsSelected(false);
              break;
      }
    }
    pushselectbtn(){
      var cols=[];
        cols.push(<NumberselectBtn
            ref={'all'}
            key={'all'}
            isSelected={false}
            text={'全'}
            onPress={()=>this.selectNumber('all')}
        />);
        cols.push(<NumberselectBtn
            ref={'big'}
            key={'big'}
            isSelected={false}
            text={'大'}
            onPress={()=>this.selectNumber('big')}
        />);
        cols.push(<NumberselectBtn
            ref={'small'}
            key={'small'}
            isSelected={false}
            text={'小'}
            onPress={()=>this.selectNumber('small')}
        />);
        return cols;
    }
    pushselectbtn2(){
      var cols = [];
        cols.push(<NumberselectBtn
            ref={'odd'}
            key={'odd'}
            isSelected={false}
            text={'单'}
            onPress={()=>this.selectNumber('odd')}
        />);
        cols.push(<NumberselectBtn
            ref={'even'}
            key={'even'}
            isSelected={false}
            text={'双'}
            onPress={()=>this.selectNumber('even')}
        />);
        cols.push(<NumberselectBtn
            ref={'clear'}
            key={'clear'}
            isSelected={false}
            text={'清'}
            onPress={()=>this.selectNumber('clear')}
        />);
        return cols;
    }


    getNumberbtnView(){
      return (
          <View>
            <View style={mystyle.row}>
                {this.pushselectbtn()}
            </View>
            <View style={mystyle.row}>
                {this.pushselectbtn2()}
            </View>
          </View>
      )
    }
    getNumberView(){
        var cols = [];
        var cols2 = [];
        for (var i = 0; i < this.state.maxNum; i++) {
            var isSelected = _.includes(this.state.selected,i);
            var refstr = 'nc'+i;
            var nc = <NumberCircle
                ref={refstr}
                key={i}
                isSelected={isSelected}
                number={i}
                onPress={(number,status)=>this.onPress(number,status)}
            />;

            if(i < 5){
                cols.push(
                    nc
                );

            }else{
                cols2.push(
                    nc
                );
            }
        }
        return (
            <View>
              <View style={mystyle.row}>
                  {cols}
              </View>
              <View style={mystyle.row}>
                  {cols2}
              </View>
            </View>
        )
    }
  render(){

    return (
      <View style={mystyle.row}>
          <View style={{alignSelf:'stretch',marginRight:10}}>
              <Text style={mystyle.title}>{this.props.title}</Text>
              <View style={mystyle.jpp_hide_view_under}></View>
          </View>
          {this.getNumberView()}
          <View style={mystyle.numbtnview}>
              {this.getNumberbtnView()}
          </View>
      </View>
    )
  }
}
const mystyle=StyleSheet.create({
    row:{
          flex:1,
          flexDirection:'row',
          alignItems:'center',
          marginRight:10,
          marginVertical:2,
    },
    title: {
        color: '#ea5656',
        fontSize: Utils.FONT_BIG_SUB,
        marginTop:5*Utils.scale
    },
    numbtnview:{
        marginLeft:10
    },
    jpp_hide_view_under:{
        width:32,
        height:3,
        borderRadius:1.5,
        backgroundColor:'#ea5656',
        alignSelf:'center'
    },
})
