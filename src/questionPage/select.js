import React, { Component } from 'react';
import styles from './style.scss';
import CSSModules from 'react-css-modules';

class App extends Component {
    chooseAnswerHandler = (e) => {
        e.stopPropagation();
        console.log(e.currentTarget.value);
    };
    render() {
        const values = this.props.values;
        const options = [];
        for (let i = values.min; i <= values.max; i++) {
            options.push(i);
        }
        return <select onChange={this.chooseAnswerHandler}>
            {
                options.map(item => (<option key={item} value={item}>{item}</option>))
            }
        </select>
    }
}

export default CSSModules(App, styles);