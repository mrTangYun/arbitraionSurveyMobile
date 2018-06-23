import React, { Component } from 'react';
import styles from './style.scss';
import CSSModules from 'react-css-modules';
const lang = 'chn';

class App extends Component {
    chooseAnswerHandler = (e) => {
        e.stopPropagation();
        console.log(this.props.item);
    };
    render() {
        const {item, index} = this.props;
        return (
            <div>
                <label
                    htmlFor={item[lang] + index}
                >{item[lang]}</label>
                <input
                    type="radio"
                    value={item[lang]}
                    name={'question' + this.props.index}
                    id={item[lang] + index}
                    onChange={this.chooseAnswerHandler}
                />
            </div>
        );
    }
}

export default CSSModules(App, styles);