'use strict';
import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight,
    ScrollView,
    WebView
} from 'react-native';

import styles from './stylecpxzs';
import Utils from './Utils';
import NotoolTimeViewOld from './comp/NotoolTimeView'
import NavigatorTitle from './comp/NavigatorTitle'
import Loading from './comp/Loading'


let WEBVIEW_REF = 'web_view'
export default class NewsDescView extends React.Component{

  static propTypes = {
    key:React.PropTypes.string,
  }

	constructor(props) {
      super(props)
      console.log('key:'+this.props.data);
	    this.state = {
	      fetchurl: 'news/appNoticeDetail/'+this.props.data,
	      status: 'No Page Loaded',
	      backButtonEnabled: false,
	      forwardButtonEnabled: false,
	      loading: false,
	      scalesPageToFit: true,
        data:{createTime:'yyyy-mm-dd',title:'title',key:'key',summary:'summarysummarysummarysummary',isTop:false,content:'内容。。。。。。。。。'}
	    }
    }

    componentDidMount(){
      // this.queryTime();
      this.queryNewsDesc();
    }

    queryNewsDesc(){

      Utils.getWithParams(this.state.fetchurl)
      .then((data)=>{
        console.log('queryNewsDesc='+JSON.stringify(data.data));
            if(!data){
                    this.setState({
                               loaded:true,
                               });
                    return;
             }
              // console.log(JSON.stringify(data.details))
              this.setState({
                data:data.data,
                loaded:true,
                // charthtml:JSON.stringify(data.details),
              });
        })
    }

	render(){
		return (
			<View style={styles.container}>
      <NavigatorTitle
         onPress={()=>this.props.navigator.pop()}
         text={'公告详情'}>
      </NavigatorTitle>

      <NotoolTimeViewOld />

      <View style={styles.splitLine}></View>

        <View style={{flexDirection:'row',justifyContent:'center',marginTop:5}}>
          <Text style={{color:'#999',fontSize:14,marginRight:20}}>来源：彩票小助手</Text>
          <Text style={{color:'#999',fontSize:14}}>时间:{this.state.data.createTime.split(' ')[0]}</Text>
        </View>
        {this.state.loaded ?
          <WebView
                automaticallyAdjustContentInsets={false}
                style={{backgroundColor:'#0000',flex:1}}
    	          ref={WEBVIEW_REF}
                source={{html:'<div>'+this.state.data.content+'</div>'}}
                scrollEnabled={true}
                javaScriptEnabled={true}
    	          domStorageEnabled={true}
    	          decelerationRate="normal"
    	        />
          :
          <Loading />
        }
        </View>
		)
	}
}
