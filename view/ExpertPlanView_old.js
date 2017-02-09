'use strict';
import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    TouchableHighlight,
    Picker,
    Modal,
} from 'react-native';

import styles from './stylecpxzs';
import Utils from './Utils';
import JppHideView from './comp/JppHideView'


class ExpertPlanView extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      total:0,
      loaded:false,
      fetchurl:'loadHistoryNumber?caipioaType=cqssc&dateStr=0',//查询当天
      isWf:false,
      isFn:false,
      isPlan:false,
      wf:'dw',
      fn1:'1',
      fn2:'1',
      fn3:'1',
      modal1:false,
      modal2:false,
      modal3:false,
    }
  }
  onMorePress(){
    this.setState({
      isWf:!this.state.isWf
    })
  }
  onFnPress(){
    this.setState({
      isFn:!this.state.isFn
    })
  }
  wfChange(index){
    this.setState({
      wf:index
    })
  }

  showPicker(index){
    if(index == 1){
      this.setState({
        modal1:!modal1
      })
    }
    if(index == 2){
      this.setState({
        modal2:!modal2
      })
    }
    if(index == 3){
      this.setState({
        modal3:!modal3
      })
    }
  }

  pickOnChange(){

  }

  render(){
    return(
      <View style={styles.container}>
        <View style={styles.firstPage_title_container}>
            <Text style={styles.firstPage_title_left}>精品计划</Text>
            <Text style={styles.firstPage_title_right}>立即生成</Text>
        </View>
        <View style={{backgroundColor:'#fff',flexDirection:'row',marginVertical:5,justifyContent:'center'}}>
          <Image source={require('./ico/index_logo.png')} style={{marginLeft:10,marginRight:2,width:30,height:30}} / >
          <Text style={{textAlign:'left',flex:1,alignSelf:'center'}}>第20161222-063期</Text>
           <View style={{flexDirection:'row'}}>
                <Text style={{textAlign:'center',alignSelf:'center'}}>投注时间剩余:</Text>
                <Text style={{fontSize:18,color:'#ea5656',alignSelf:'center'}}>00</Text>
                <Text style={{textAlign:'center',alignSelf:'center'}}>时</Text>
                <Text style={{fontSize:18,color:'#ea5656',alignSelf:'center'}}>09</Text>
                <Text style={{textAlign:'center',alignSelf:'center'}}>分</Text>
                <Text style={{fontSize:18,color:'#ea5656',alignSelf:'center'}}>45</Text>
                <Text style={{textAlign:'center',alignSelf:'center'}}>秒</Text>
          </View>
        </View>

        <View style={styles.splitLine_w}></View>
        <TouchableHighlight onPress={()=>this.onMorePress()} underlayColor="#fff2">
          <View style={styles.firstPage_history}>
            <View style={styles.firstPage_history_start}></View>
            <Text style={styles.firstPage_history_left}>请选择玩法</Text>
            <Image source={require('./ico/index_logo.png')} style={{width:20,height:20,marginRight:20}} />
          </View>
        </TouchableHighlight>
        {this.state.isWf &&
          <View style={styles.jpp_hide_view}>
            <Text onPress={()=>this.wfChange('dw')} style={this.state.wf=='dw'&&{color:'#f00'}}>定位胆计划</Text>
            <Text onPress={()=>this.wfChange('bdw')} style={this.state.wf=='bdw'&&{color:'#f00'}}>胆码计划</Text>
            <Text onPress={()=>this.wfChange('zux')} style={this.state.wf=='zux'&&{color:'#f00'}}>组选计划</Text>
            <Text onPress={()=>this.wfChange('zhx')} style={this.state.wf=='zhx'&&{color:'#f00'}}>直选计划</Text>
          </View>
        }
        <View style={styles.splitLine_w}></View>
        <TouchableHighlight onPress={()=>this.onFnPress()} underlayColor="#fff2">
          <View style={styles.firstPage_history}>
            <View style={styles.firstPage_history_start}></View>
            <Text style={styles.firstPage_history_left}>请设置玩法方案</Text>
            <Image source={require('./ico/index_logo.png.png')} style={{width:20,height:20,marginRight:20}} />
          </View>
        </TouchableHighlight>
        {this.state.isFn &&
            <View style={styles.jpp_hide_view_fn}>
              <Text style={{marginTop:5,marginLeft:20,marginRight:5}}>方案设置</Text>
              <JppHideView
                title={'个位'}
                onClick={()=>this.showPicker(1)}
              />
              <JppHideView
                title={'5码'}
                onClick={()=>this.showPicker(1)}
              />
              <JppHideView
                title={'3期'}
                onClick={()=>this.showPicker(1)}
              />
          </View>
        }
        <Modal
          visible={this.state.modal1}
          //显示是的动画默认none
          //从下面向上滑动slide
          //慢慢显示fade
          animationType = {'slide'}
          //是否透明默认是不透明 false
          transparent = {true}
          //关闭时调用
          onRequestClose={()=> this.onRequestClose()}>
          <Picker
            selectedValue={this.state.fn1}
            onValueChange={(index) => this.setState({fn1: index})}>
            {this.state.wf == 'dw' &&
              <Picker.Item label="个" value="1" />
              <Picker.Item label="十" value="2" />
              <Picker.Item label="百" value="3" />
              <Picker.Item label="千" value="4" />
              <Picker.Item label="万" value="5" />
            }
            {this.state.wf == 'bdw' &&
              <Picker.Item label="前二" value="1" />
              <Picker.Item label="前三" value="2" />
              <Picker.Item label="后二" value="3" />
              <Picker.Item label="后三" value="4" />
              <Picker.Item label="五星" value="5" />
              <Picker.Item label="中三" value="6" />
              <Picker.Item label="前四" value="7" />
              <Picker.Item label="后四" value="8" />
            }
            {this.state.wf == 'zux' &&
              <Picker.Item label="前二" value="1" />
              <Picker.Item label="后二" value="2" />
              <Picker.Item label="前三组六" value="3" />
              <Picker.Item label="中三组六" value="4" />
              <Picker.Item label="后三祖六" value="5" />
            }
            {this.state.wf == 'zhix' &&
              <Picker.Item label="前二" value="1" />
              <Picker.Item label="后二" value="2" />
              <Picker.Item label="前三" value="3" />
              <Picker.Item label="中三" value="4" />
              <Picker.Item label="后三" value="5" />
            }
          </Picker>
          <View style={{flexDirection:'row'}}>
              <Text style={{flex:1,textAlign:'center'}}>确定</Text>
              <Text style={{flex:1,textAlign:'center'}}>取消</Text>
          </View>
        </Modal>
        <Modal
          visible={this.state.modal2}
          //显示是的动画默认none
          //从下面向上滑动slide
          //慢慢显示fade
          animationType = {'slide'}
          //是否透明默认是不透明 false
          transparent = {true}
          //关闭时调用
          onRequestClose={()=> this.onRequestClose()}>
          <Picker
            selectedValue={this.state.fn1}
            onValueChange={(index) => this.setState({fn2: index})}>
            {this.state.wf == 'bdw' ?
              <Picker.Item label="1码" value="1" />
              <Picker.Item label="2码" value="2" />
              <Picker.Item label="3码" value="3" />
              <Picker.Item label="4码" value="4" />
              <Picker.Item label="5码" value="5" />
              <Picker.Item label="6码" value="6" />
              :
              <Picker.Item label="1码" value="1" />
              <Picker.Item label="2码" value="2" />
              <Picker.Item label="3码" value="3" />
              <Picker.Item label="4码" value="4" />
              <Picker.Item label="5码" value="5" />
              <Picker.Item label="6码" value="6" />
              <Picker.Item label="7码" value="7" />
              <Picker.Item label="8码" value="8" />
              <Picker.Item label="9码" value="9" />
            }
          </Picker>
          <View style={{flexDirection:'row'}}>
              <Text style={{flex:1,textAlign:'center'}}>确定</Text>
              <Text style={{flex:1,textAlign:'center'}}>取消</Text>
          </View>
        </Modal>
        <Modal
          visible={this.state.modal3}
          //显示是的动画默认none
          //从下面向上滑动slide
          //慢慢显示fade
          animationType = {'slide'}
          //是否透明默认是不透明 false
          transparent = {true}
          //关闭时调用
          onRequestClose={()=> this.onRequestClose()}>
          <Picker
            selectedValue={this.state.fn1}
            onValueChange={(index) => this.setState({fn3: index})}>

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
          <View style={{flexDirection:'row'}}>
              <Text style={{flex:1,textAlign:'center'}}>确定</Text>
              <Text style={{flex:1,textAlign:'center'}}>取消</Text>
          </View>
        </Modal>
        <View style={styles.splitLine_w}></View>

      </View>
    )
  }
}

module.exports = ExpertPlanView;
