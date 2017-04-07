
import React from 'react'
import {
    View,
    WebView
} from 'react-native'

import styles from './../stylecpxzs'
import NavigatorTitle from './../comp/NavigatorTitle'

export default class AliPayView extends React.Component{
    static propTypes = {
        form:React.PropTypes.string
    }

    constructor(props){
        super(props)
    }

    onNavigationStateChange(navState) {

    }
    onShouldStartLoadWithRequest(event) {
        // Implement any custom loading logic here, don't forget to return!
        return true;
    }

    render(){
        console.log(`form:`+this.props.form)
        return(
            <View style={styles.container}>
                <NavigatorTitle
                    onPress={()=>this.props.navigator.pop()}
                    text={'支付宝支付'}>
                </NavigatorTitle>
                <WebView
                    style={styles.view_container}
                    automaticallyAdjustContentInsets={false}
                    source={{html:this.props.form}}
                    onNavigationStateChange={this.onNavigationStateChange}
                    onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                />
            </View>
        )
    }
}
