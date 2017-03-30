import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight,
    Image,
} from 'react-native';
import Utils from './../Utils'

export  default class NumberselectBtn extends React.Component{
    static propTypes={
        text:React.PropTypes.string,
        isSelected:React.PropTypes.bool,
        onPress:React.PropTypes.func,
    }

    static defaultProps = {
        text:0,
        isSelected:false,
    }

    constructor(props) {
        super(props)
        this.state={
            text:this.props.text,
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
        this.props.onPress && this.props.onPress(this.state.text,!this.state.isSelected)
    }

    render(){
        return (
            <TouchableHighlight
                underlayColor={'#fff2'}
                onPress={()=>this.onClick()}>
                <View
                    style={[mystyle.circle,this.state.isSelected&&mystyle.circle_selected]}>
                    <View >
                        <Text style={this.state.isSelected?mystyle.c_number_selected:mystyle.c_number}>{this.state.text}</Text>
                    </View>
                </View>
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
        borderWidth:1,
        borderRadius:4,
    },
    circle_selcted:{
      borderColor:'#ea5656',
    },
    c_number:{
        fontSize:14*Utils.scale,
        color:'#333',
        textAlign:'center',
    },
    c_number_selected:{
        fontSize:14*Utils.scale,
        color:'#ea5656',
        textAlign:'center',
    },
});