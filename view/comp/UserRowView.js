
'use strict';
import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    TouchableHighlight,

} from 'react-native';
import styles from './../stylecpxzs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Utils from './../Utils'

export default class UserRowView extends React.Component{
  static propTypes={
    onNext: React.PropTypes.func,
    title:  React.PropTypes.string,
    titleRight:  React.PropTypes.string,
    img: React.PropTypes.number,
    bgcolor: React.PropTypes.string
  }
  //如果图片没有背景色可以配置bgcolor
  static defaultProps = {
    title:'需要配置',
    titleRight:'',
    bgcolor:'#f0f',
  }
  constructor(props){
       super(props);
  }
  render(){
    return(
      <View style={{marginTop:1,padding:10,backgroundColor:'#fff',flexDirection:'row'}}>
        <Image
          style={{width:24*Utils.scale,height:24*Utils.scale}}
          source={this.props.img}
          />
        <Text style={{textAlign:'left',marginTop:3,marginLeft:5,fontSize:16*Utils.scale}}>{this.props.title}</Text>
        {this.props.onNext ?
          <TouchableHighlight
            style={{flex:1}}
            underlayColor={'#fff2'}
            onPress={()=>this.props.onNext&&this.props.onNext()}>
            <View  style={{flexDirection:'row',alignItems:'center'}}>
                <Text  style={{flex:1,textAlign:'right',marginTop:3,fontSize:16}}>{this.props.titleRight}</Text>
                <Icon name={'angle-right'} size={25*Utils.scale} color={'#999'} style={{marginLeft:10}}/>
            </View>
          </TouchableHighlight>
        :
          <View  style={{flexDirection:'row',flex:1,alignItems:'center'}}>
              <Text  style={{flex:1,textAlign:'right',marginTop:3,fontSize:16}}>{this.props.titleRight}</Text>
          </View>
        }
      </View>
    )
  }
}
