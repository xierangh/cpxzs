'use strict';

import React from 'react';

import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    Image,
} from 'react-native';


export default class JppHideView extends React.Component{

    static propTypes={
      onClick:React.PropTypes.func,
      title:React.PropTypes.string,
      title_const:React.PropTypes.string,
    }

    static defaultProps={
      title_const:''
    }
    constructor(props){
      super(props);
    }

    render(){
      return (
        <TouchableHighlight onPress={()=>this.props.onClick()}>
            <View style={{marginRight:8,width:64,height:30,borderRadius:12,borderWidth:1,borderColor:'#f00',flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
              <Text style={{color:'#ea5656'}}>{this.props.title}</Text>
              <Text style={{color:'#ea5656'}}>{this.props.title_const}</Text>
              <Image source={require('./../ico/m_down.png')} style={{width:7,height:7}} />
            </View>
        </TouchableHighlight>
      )
    }
}
