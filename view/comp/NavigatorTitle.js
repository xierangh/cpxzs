/**
 *导航栏
 *
 */
'use strict';

import React, {Component,PropTypes} from 'react';

import {
    StyleSheet,
    View,
    Text,
    TouchableNativeFeedback,
    TouchableHighlight,
    Image,
} from 'react-native';

let title_color_bg = 'rgba(238, 83, 88,1.0)';

export default class NavigatorTitle extends Component{
  static propTypes={
      onPress:PropTypes.func,
  }

  constructor(props) {
    super(props)
  }

  onBtnPress(){
  			this.props.onPress && this.props.onPress()
  }

  render() {
      return (
              	<View style={styles.container}>
                  <TouchableHighlight
                      disabled={this.state.isPress}
                      underlayColor="#fff0"
                      onPress={this.onBtnPress}>
                		<Image
                        source={require('image!back')}
		                    style={styles.image}
		                    />
                  </TouchableHighlight>
              		<Text style={styles.text}>{this.props.text}</Text>
              	</View>
              );
  }
}

let styles = StyleSheet.create({

                                 container: {
                                   paddingTop:25,
                                   height:63,
                                   backgroundColor:title_color_bg,
                                   alignItems: 'flex-start',
                                   flexDirection: 'row',
                                 },
                                 image:{
                                   marginVertical:5,
                                   marginLeft:20,
                                   height:20,
                                   width:20,
                                   alignItems: 'center',
                                 },
                                 text: {
                                   flex: 2,
                                   color:'#fff',
                                   alignSelf:'center',
                                   textAlign:'center',
                                   fontSize:18,
                                   marginRight:50,
                                 },

}
);
