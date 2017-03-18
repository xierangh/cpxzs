'use strict';
import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableHighlight,
} from 'react-native';

import styles from './stylecpxzs';
import Utils from './Utils';
import NotoolTimeView from './comp/NotoolTimeView'
import NotoolTitleView from './comp/NotoolTitleView'
import Notool2View from './Notool2View'
import Notool3View from './Notool3View'

import _ from 'lodash'


var items=[
  {
    zhgjType:2,
    showStr:'二星做号',
  },
  {
    zhgjType:3,
    showStr:'三星做号',
  }
]
var zhgjType=2;
export default class NoToolView extends React.Component{
  constructor(props) {
    super(props)
    this.state={
      zhgjType:zhgjType,
      omession:{aCurrOmission:{countList:[0,0,0,0,0,0,0,0,0,0]},bCurrOmission:{countList:[0,0,0,0,0,0,0,0,0,0]},cCurrOmission:{countList:[0,0,0,0,0,0,0,0,0,0]},
      dCurrOmission:{countList:[0,0,0,0,0,0,0,0,0,0]},eCurrOmission:{countList:[0,0,0,0,0,0,0,0,0,0]}},
    }
  }

  titleChange(value){
    this.setState({
      zhgjType:value.zhgjType,

    })
  }

  componentDidMount(){
    this.queryOmission();
  }

  onRefresh(){
      this.timer && clearTimeout(this.timer);
      this.timer = setTimeout(()=>this.queryOmission(),1000*60*2);
  }

  queryOmission(){

    this.timer && clearTimeout(this.timer);

     Utils.getWithParams('omission/dwdOmission')
     .then((data)=>{
           if(!data){

               return;
            }
            console.log(data);
            this.setState({
              omession:data,
            })
       })
  }

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.firstPage_title_container}>
            <NotoolTitleView
              items={items}
              selected={items[0]}
              onSelected={(value)=>this.titleChange(value)}
              />
        </View>

        <NotoolTimeView
          ref='timeview'
          refresh={()=>this.onRefresh()}
        />

        {this.state.zhgjType == 2 &&
          <Notool2View
            omession={this.state.omession}
          />
        }
        {this.state.zhgjType == 3 &&
          <Notool3View
            omession={this.state.omession}
          />
        }
    </View>
    );
  }
}
