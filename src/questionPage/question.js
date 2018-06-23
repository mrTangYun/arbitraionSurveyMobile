import React, { Component } from 'react';
import styles from './style.scss';
import CSSModules from 'react-css-modules';
import Radio from './radio';
import Select from './select';
const lang = 'chn';

class App extends Component {
    renderAnswer = () => {
        const data = this.props.data;
        let result = null;
        if (data.type === 'radio') {
            result = data.a.map((item, index) => (<Radio item={item} index={this.props.index} key={item[lang]} />));
        }
        if (data.type === 'select') {
            result = <Select values={data.values} />;
        }
        return result;
    };
    render() {
        const data = this.props.data;
        console.log(data);
        const answerComponent = this.renderAnswer();
        return (
            <div>
                <div>题目{this.props.index}</div>
                <div>{data.q[lang]}</div>
                <div>{answerComponent}</div>
            </div>
        );
    }
}

export default CSSModules(App, styles);