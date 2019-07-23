import React, {Component} from 'react';
import {WebView,View,Platform} from 'react-native';
import { Asset } from 'expo';  

export default class PayPal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            sent: false
        }
        const patchPostMessageFunction = function() {
            var originalPostMessage = window.postMessage;
            var patchedPostMessage = function(message, targetOrigin, transfer) {
                originalPostMessage(message, targetOrigin, transfer);
            };
            patchedPostMessage.toString = function() {
                return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
            };
            window.postMessage = patchedPostMessage;
        };
        this.patchPostMessageJsCode = '(' + String(patchPostMessageFunction) + ')();';
    }
    componentWillMount() {
        this.setState({
            loading: true
        });
    }
    handleNavigation(event) {
        'handleNavigation' in this.props && this.props.handleNavigation(event)
    }
    
    handleMessage(event) {
        let data = event.nativeEvent.data;
        data = JSON.parse(data);
        if (data.status == 'success') {
            this.props.success(data)
        } else {
            this.setState({
                loading: false
            });
            this.props.failed(data)
        }
    }
    passValues() {
        let data = {
            amount             : 'amount'             in this.props  ? this.props.amount             : null,
            orderID            : 'orderID'            in this.props  ? this.props.orderID            : null,
            ProductionClientID : 'ProductionClientID' in this.props ? this.props.ProductionClientID : null
        };
        if (!this.state.sent) {
            this.refs.webview.postMessage(JSON.stringify(data));
            this.setState({
                loading: false,
                sent: true
            });
        }
    }
    
    render() {
        const { localUri } = Asset.fromModule(require('./paypal.html'));
        return ( <View style = {{flex: 1}}>
                <WebView style = {{overflow: 'scroll'}}
                source = {
                    Platform.OS === 'android' ?
                    {
                        uri: localUri.includes('ExponentAsset') ?
                            localUri :
                            'file:///android_asset/' + localUri.substr(9),
                    } :
                        require('./paypal.html')
                }
                originWhitelist = {["*"]}
                mixedContentMode = {'always'}
                useWebKit = {Platform.OS == 'ios'}
                onLoadEnd = {() => this.passValues()}
                ref = "webview"
                thirdPartyCookiesEnabled = {true}
                scrollEnabled = {true}
                domStorageEnabled = {true}
                startInLoadingState = {true}
                injectedJavaScript = {this.patchPostMessageJsCode}
                allowUniversalAccessFromFileURLs = {true}
                onMessage = {(event) => this.handleMessage(event)}
                onNavigationStateChange = {(event) => this.handleNavigation(event)}
                javaScriptEnabled = {true}/>
            </View>
        );
    }
}