import React, { Component } from 'react';
import styles from './style.scss';
import CSSModules from 'react-css-modules';
import Question from './question';
class App extends Component {
    constructor() {
        super();
        this.state = {
            currentIndex: 2,
            qustions: [
                {
                    q: {
                        chn: '您是否了解《纽约公约》关于仲裁裁决承认和执行的相关规定？',
                        en: 'e您是否了解《纽约公约》关于仲裁裁决承认和执行的相关规定？'
                    },
                    type: 'radio',
                    a: [
                        {
                            chn: '是',
                            en: 'yes'
                        },
                        {
                            chn: '否',
                            en: 'no'
                        }
                    ]
                },
                {
                    q: {
                        chn: '请问您参与过的国际仲裁案件有多少起？',
                        en: 'e请问您参与过的国际仲裁案件有多少起？'
                    },
                    type: 'select',
                    values: {
                        min: 0,
                        max: 100
                    }
                },
                {
                    q: {
                        chn: '在您参与过的国际仲裁案件中，您具体参与的身份是？？',
                        en: 'e在您参与过的国际仲裁案件中，您具体参与的身份是？？'
                    },
                    type: 'checkbox',
                    values: [
                        {
                            chn: '当事人',
                            en: 'dsr'
                        },
                        {
                            chn: '代理人和仲裁员都有',
                            en: 'dsr3'
                        },
                        {
                            chn: '当事人2',
                            en: 'dsr2'
                        },
                        {
                            chn: '当事人4',
                            en: 'dsr4'
                        },
                        {
                            chn: '当事人5',
                            en: 'dsr5'
                        }
                    ]
                }
            ]
        };
    }
    clickNextHandler = () => {
        this.setState({
            currentIndex: (this.state.currentIndex || 0)  + 1
        });
    };
    render() {
        const {qustions, currentIndex = 0} = this.state;
        if (!qustions.length) return null;
        const qustion = qustions[currentIndex];
        return <div styleName="page" className={styles.questionPage}>
            <div styleName="logo">
                <img src={require('../images/logo.png')} alt=""/>
            </div>
            <div styleName="outer">
                <div styleName="qustionOuter">
                    <Question index={currentIndex + 1} data={qustion} />
                </div>
                <div styleName="commonBottom">
                    <div styleName="buttons">
                        {
                            !!currentIndex && <div>上一题</div>
                        }
                        <div onClick={this.clickNextHandler}>下一题</div>
                    </div>
                    <div styleName="progressOuter">
                        <div styleName="progress">
                            <div styleName="progress-bar" style={{
                                width: '30%'
                            }} />
                        </div>
                        <img src={require('../images/hightlight.png')} alt=""/>
                    </div>
                </div>
            </div>
        </div>;
    }
}

export default CSSModules(App, styles);