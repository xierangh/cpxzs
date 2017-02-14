/**
 *按钮及样式
 *
 */
'use strict';

import React from 'react';

import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
} from 'react-native';

import Utils from './../Utils'
export default class CustomButton extends React.Component {
   static propTypes = {
      onPress: React.PropTypes.func,
   };
   static defaultProps = {
      checked: false,
    };
   constructor(props){
        super(props);
        this.state = {
          isPress:false
        }
    }
    onBtnPress(){
//  		console.log('isPressed:'+this.state.isPress)
    		if(!this.state.isPress){
    				this.setState({
			    		isPress : true,
			    	})
//  			console.log('isPressed changed:'+this.state.isPress)
    			this.props.onPress && this.props.onPress()
    		}
    }
    setPressed(pressed:bool){
	    	this.setState({
	    		isPress : pressed,
	    	})
    }
    render() {
        return (
                <TouchableHighlight
                		disabled={this.state.isPress}
                    style={[styles.style_view_commit,!this.state.isPress && styles.style_view_commit_bg,
                    this.state.isPress&&styles.style_view_pressed_bg]}
                    underlayColor="#ea5656c0"
                    onPress={()=>this.onBtnPress()}>

                    	<Text style={styles.style_text_commit}>{this.props.text}</Text>

                </TouchableHighlight>
                );
    }
 }

let styles = StyleSheet.create({
                               style_view_commit:{
                                     marginTop:15,
                                     marginLeft:20,
                                     marginRight:20,
                                     height:46*Utils.scale,
                                     borderRadius:5,
                                     justifyContent: 'center',
                                     alignItems: 'stretch',
                                 },
	                             style_view_commit_bg:{
	                               	  backgroundColor:'#ea5656',
	                             },
	                             style_view_pressed_bg:{
	                               	  backgroundColor:'rgb(255,131,33)',
	                             },
                                 style_text_commit:{
                                           color:'#ffffff',
                                           fontSize:20*Utils.scale,
                                           textAlign:'center',
                                 },
                                 container: {
                                   flex: 1,
                                   alignItems: 'flex-start',
                                   flexDirection: 'row',
                                   alignSelf:'stretch',
                                   },
                                   image:{
                                   marginVertical:5,
                                   marginLeft:30,
                                   height:20,
                                   width:20,
                                   alignItems: 'center',
                                   },
                                   text: {
                                   flex: 2,
                                   fontSize:16,
                                   color:'#ffffff',
                                   alignSelf:'center',
                                   textAlign:'center',
                                   marginRight:50,
                                   },
});
