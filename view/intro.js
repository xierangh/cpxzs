/**
 * Created by lenovo on 2017/12/11.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import mystyles from './stylecpxzs'
import TabView from './TabView.android'
import Utils from './Utils'
import Button from 'react-native-smart-button'


import Swiper from 'react-native-swiper';


export default class intro extends Component{

    gotoMain(){
        this.props.navigator.push({
            navigationBarHidden:true,
            itemWrapperStyle:styles.wrapperStyle,
            component:TabView,
        });
    }

    render() {
        return (
            <Swiper style={styles.wrapper}
                    loop={false}
                    showsPagination={false}
                    showsButtons={false}>

                <View style={styles.slide1}>
                    <Image source={require('./ico/1.png')} style={styles.image}></Image>
                </View>
                <View style={styles.slide2}>
                    <Image source={require('./ico/2.png')} style={styles.image}></Image>
                </View>
                <View style={styles.slide3}>
                    <Image source={require('./ico/3.png')} style={styles.image}>
                            <Button style={styles.slide3}
                                    onPress={()=>this.gotoMain()}
                            />
                    </Image>
                </View>
            </Swiper>
        )
    }
}

var styles = StyleSheet.create({
    wrapper: {
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE500',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD900',
    },
    slide4: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#92BBD900',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    image:{
        flex:1,
        resizeMode:'contain'
    }
})