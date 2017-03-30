/**
 * 定位胆遗漏
 */

import React from 'react'
import {
    View,
    StyleSheet,
}from 'react-native'

import Utils from './../../Utils'
import styles from './../../stylecpxzs'
import YilouRowView from './YilouRowView'

export default class Yiloudwd extends React.Component{

    constructor(props){
        super(props)
        this.state={
            omession:{
                "aCurrOmission":{"weiType":null,"countList":[0,2,4,36,6,9,5,8,3,1],"maxYLCount":36},
                "bCurrOmission":{"weiType":null,"countList":[9,1,5,27,12,0,14,4,3,18],"maxYLCount":27},
                "dCurrOmission":{"weiType":null,"countList":[0,24,7,3,4,8,5,1,14,22],"maxYLCount":24},
                "cCurrOmission":{"weiType":null,"countList":[9,3,6,1,8,7,0,12,31,40],"maxYLCount":40},
                "eCurrOmission":{"weiType":null,"countList":[0,21,1,2,4,7,3,18,26,9],"maxYLCount":26},
                "aHistoryOmission":{"weiType":null,"countList":[110,100,97,113,106,119,95,99,89,157],"maxYLCount":157},
                "bHistoryOmission":{"weiType":null,"countList":[91,100,109,121,111,142,111,98,97,93],"maxYLCount":142},
                "cHistoryOmission":{"weiType":null,"countList":[101,106,94,110,101,124,104,94,99,104],"maxYLCount":124},
                "dHistoryOmission":{"weiType":null,"countList":[90,125,101,92,108,117,143,105,86,122],"maxYLCount":143},
                "eHistoryOmission":{"weiType":null,"countList":[93,105,125,96,105,120,120,104,90,117],"maxYLCount":125},
                "success":true,}
        }
    }

    componentDidMount(){
        this.queryOmission();
    }

    queryOmission(){

        Utils.getWithParams('omission/dwdOmission')
            .then((data)=>{
                if(!data){

                    return;
                }
                console.log(JSON.stringify(data));
                this.setState({
                    omession:data,
                })
            })
    }

    render(){
        return(
        <View style={mystyle.row_bottom}>
            <YilouRowView
                currOmission={this.state.omession.eCurrOmission}
                historyOmission={this.state.omession.aHistoryOmission}
                title={'万位'}
            />
            <View style={styles.splitLine}></View>
            <YilouRowView
                currOmission={this.state.omession.dCurrOmission}
                historyOmission={this.state.omession.dHistoryOmission}
                title={'千位'}
            />
            <View style={styles.splitLine}></View>
            <YilouRowView
                currOmission={this.state.omession.cCurrOmission}
                historyOmission={this.state.omession.cHistoryOmission}
                title={'百位'}
            />
            <View style={styles.splitLine}></View>
            <YilouRowView
                currOmission={this.state.omession.bCurrOmission}
                historyOmission={this.state.omession.bHistoryOmission}
                title={'十位'}
            />
            <View style={styles.splitLine}></View>
            <YilouRowView
                currOmission={this.state.omession.aCurrOmission}
                historyOmission={this.state.omession.eHistoryOmission}
                title={'个位'}
            />
        </View>
        )
    }
}

const  mystyle = StyleSheet.create({
    row_bottom:{
        marginBottom:30,
    }
});