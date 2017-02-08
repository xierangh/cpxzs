/**
 * React Native News App
 * https://github.com/tabalt/ReactNativeNews
 */
'use strict';

import React from 'react';
import {
    StyleSheet,
    Text,
    PropTypes,
    View,
} from 'react-native';

export default class Loading extends React.Component{
    static propTypes={
      showInfo:React.PropTypes.string,
    }

    static defaultProps={
      showInfo:'正在加载...',
    }

    constructor(props){
      super(props)
      this.state={
        showInfo:this.props.showInfo
      }
      console.log('Loading ...');
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                {this.state.showInfo}
                </Text>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor : '#0000',
    },

   text:{
     fontSize:14,
     color:'#000',
   },
});
