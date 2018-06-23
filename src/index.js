// import React from 'react';
// import ReactDOM from 'react-dom';
import './index.css';
import './style.scss';
import $ from 'jquery';
// import App from './App';

// ReactDOM.render(<App />, document.getElementById('root'));

const $btnPrev = $('.btn-pre'), $btnNext = $('.btn-next'), $btnSubmit = $('.btn-submit'), $prograssBar=$('.progress-bar');
const questionCount = $('.questionItem').length;

const calProgress = () => {
    const index = $('.questionItem:visible').index('.questionItem');
    const width = (index + 1) / questionCount * 100;
    $prograssBar.css('width', width + '%');
    if (index === 0) {
        $btnPrev.hide();
    } else {
        $btnPrev.show();
    }
    if (index + 1 === questionCount) {
        $btnNext.hide();
        $btnSubmit.show();
    } else {
        $btnNext.show();
        $btnSubmit.hide();
    }
};
const bindHandler = () => {
    $('table .chn, table .en').map((index, element) => {
        const text = $(element).text();
        const length = text.length;
        const html = [];
        html.push('<span>');
        text.split('').map((char, index) => {
            html.push(`<span>${char}${index === (length - 1) ? ":" : ''}</span>`);
        });
        html.push('</span>');
        $(element).html(html.join(''));
    });
    $(document).on('touchstart', '.answer.radios > div', {}, function() {
        $(this).addClass('choosed').siblings().removeClass('choosed');
    });
    $(document).on('touchstart', '.answer.checkbox > div', {}, function() {
        if ($(this).hasClass('choosed')) {
            $(this).removeClass('choosed');
        }
        else {
            $(this).addClass('choosed');
        }
    });

    $(document).on('touchstart', '.btn-pre', {}, function() {
        const $currentItem = $('.questionItem:visible');
        $currentItem.hide().prev().show();
        calProgress();
    });
    $(document).on('touchstart', '.btn-next', {}, function() {
        const $currentItem = $('.questionItem:visible');
        $currentItem.hide().next().show();
        calProgress();
    });

    $(document).on('touchstart', '.btn-start-chn', {}, function() {
        $('#homePage').addClass('hide');
        $('#questionPage').removeClass('hide');
        $('#changeLang').removeClass('langEn').addClass('langChn');
        calProgress();
    });
    $(document).on('touchstart', '.btn-start-en', {}, function() {
        $('#homePage').addClass('hide');
        $('#questionPage').removeClass('hide');
        $('#changeLang').removeClass('langChn').addClass('langEn');
        $('input, textarea').attr('placeholder', '');
        calProgress();

    });
};


const init = () => {
    $('#loading').remove();
    $('.questionItem').hide().eq(0).show();
    bindHandler();
};
init();
