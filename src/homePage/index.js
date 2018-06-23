import React, { Component } from 'react';
import styles from './style.css';

import CSSModules from 'react-css-modules';
class App extends Component {
    chooseChnHandler = () => {
        this.props.chooseLangHandler && this.props.chooseLangHandler('chn');
    };
    chooseEnHandler = () => {
        this.props.chooseLangHandler && this.props.chooseLangHandler('en');
    };
    render() {
        return <div styleName="page" className={styles.homePage}>
            <div styleName="logo">
                <img src={require('../images/logo.png')} alt=""/>
            </div>
            <div styleName="PageTitle">
                <img src={require('../images/pageTitle.png')} alt=""/>
            </div>
            <div styleName="letter-chn">
                <img src={require('../images/letter-chn.png')} alt=""/>
                <div styleName="btn-start-chn" onClick={this.chooseChnHandler}>
                    <img src={require('../images/btn-start-chn.png')} alt=""/>
                </div>
            </div>
            <div styleName="letter-en">
                <img src={require('../images/letter-en.png')} alt=""/>
                <div styleName="btn-start-en" onClick={this.chooseEnHandler}>
                    <img src={require('../images/btn-start-en.png')} alt=""/>
                </div>
            </div>
        </div>;
    }
}

export default CSSModules(App, styles);