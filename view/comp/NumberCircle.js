import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight,
    Image,
} from 'react-native';
import Utils from './../Utils'

export  default class NumberCircle extends React.Component{
    static propTypes={
        number:React.PropTypes.number,
        isSelected:React.PropTypes.bool,
        onPress:React.PropTypes.func,
    }

    static defaultProps = {
        number:0,
        isSelected:false,
    }

    constructor(props) {
        super(props)
        this.state={
            number:this.props.number,
            isSelected:this.props.isSelected,
        }
    }

    setIsSelected(selected:bool){
        this.setState({
            isSelected:selected,
        })
    }

    getSelected(){
        return this.state.isSelected;
    }

    onClick(){
        this.setState({
            isSelected:!this.state.isSelected,
        })
        this.props.onPress && this.props.onPress(this.state.number,!this.state.isSelected)
    }

    render(){
        return (
            <TouchableHighlight
                underlayColor={'#fff2'}
                onPress={()=>this.onClick()}>
                <Image
                    resizeMode={'contain'}
                    source={this.state.isSelected?require('./../ico/zhgj_selected.png'):require('./../ico/zhgj_default.png')}
                    style={mystyle.circle}>
                    <View >
                        <Text style={this.state.isSelected?mystyle.c_number_selected:mystyle.c_number}>{this.state.number}</Text>
                    </View>
                </Image>
            </TouchableHighlight>
        )
    }
}

var circle_size=26*Utils.scale;
var marg = Utils.getNotoolMargin();
// console.log(height);
const mystyle=StyleSheet.create({
    circle:{
        width:circle_size,
        height:circle_size,
        alignItems:'center',
        justifyContent:'center',
        margin:marg,
    },
    c_number:{
        fontSize:14*Utils.scale,
        color:'#333',
        textAlign:'center',
    },
    c_number_selected:{
        fontSize:14*Utils.scale,
        color:'#fff',
        textAlign:'center',
    },
});