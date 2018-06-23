import React, { Component } from 'react';
import HomePage from './homePage';
import QuestionPage from './questionPage';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // currentPage: 'homepage',
            currentPage: 'questions',
            lang: ''
        };
    }
    chooseLangHandler = (lang) => {
        this.setState({
            currentPage: 'questions',
            lang
        });
    };
	render() {
        const {currentPage, lang} = this.state;
        if (currentPage === 'homepage') {
            return <HomePage chooseLangHandler={this.chooseLangHandler}/>;
        }
        if (currentPage === 'questions') {
            return <QuestionPage lang={lang} chooseLangHandler={this.chooseLangHandler}/>;
        }
        return null;
	}
}

export default App;