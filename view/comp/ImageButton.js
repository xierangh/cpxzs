/**
 *首页各种计划按钮
 *
 */
'use strict';

import React, {Component,PropTypes} from 'react';

import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    Image,
} from 'react-native';


export default class ImageButton extends React.Component{
    static propTypes={
        onPress:PropTypes.func,
        iconUrl:PropTypes.number,
        title:PropTypes.string,
        bgcolor:PropTypes.string,
    }
    static defaultProps={
      bgcolor:'#f0f',
    }
    constructor(props){
      super(props)
      this.state={
        isAsc:false,
      }
    }

    onBtnPress(){
    		this.props.onPress && this.props.onPress()
    }

    render() {
        return (
                <TouchableHighlight
                    underlayColor='#fff1'
                		disabled={this.state.isPress}
                    style={[styles.style_view_commit,this.props.customStyle]}
                    onPress={()=>this.onBtnPress()}>
                    <View>
                      <View style={[styles.firstPage_kaijiang_circle]}>
                        <Image
                          style={styles.image}
                          source={this.props.iconUrl}
                        />
                      </View>
                      <Text style={styles.text}>{this.props.title}</Text>
                    </View>
                </TouchableHighlight>
                );
    }
 }
let FirstPageCircleSize = 40;
let styles = StyleSheet.create(
                              {
                                firstPage_kaijiang_circle:{
                              		width:FirstPageCircleSize,
                              		height:FirstPageCircleSize,
                              		borderRadius:FirstPageCircleSize/2,
                              		alignItems:'center',
                              		justifyContent:'center',
                              		margin:5,
                              	},
                               style_view_commit:{
                                justifyContent: 'center',
                               	alignItems: 'center',
                               	height:60,
                               	width:60,
                              },
                             image:{
                               height:40,
                               width:40,
                             },
                             text: {
                               textAlign:'center',
                               color:'#323232',
                               fontSize:13,
                             },
}
);
