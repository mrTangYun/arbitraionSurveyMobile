// import React from 'react';
// import ReactDOM from 'react-dom';
import './index.css';
import './style.scss';
import $ from 'jquery';
// import App from './App';

// ReactDOM.render(<App />, document.getElementById('root'));

const $btnPrev = $('.btn-pre'), $btnNext = $('.btn-next'), $btnSubmit = $('.btn-submit'), $prograssBar=$('.progress-bar');
const questionCount = $('.questionItem').length;


const isNeedPreventClickEnvent = (e) => {
    if (e.type === 'click') {
        return !this.isPc;
    } else {
        return this.isPc;
    }
};

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
    $(document).on('touchstart click', '.answer.radios > div', {}, function (e) {
        if (isNeedPreventClickEnvent(e)) {
            return false;
        }
        $(this).addClass('choosed').siblings().removeClass('choosed');
    });
    $(document).on('touchstart click', '.answer.checkbox > div', {}, function (e) {
        if (isNeedPreventClickEnvent(e)) {
            return false;
        }
        if ($(this).hasClass('choosed')) {
            $(this).removeClass('choosed');
        }
        else {
            $(this).addClass('choosed');
        }
    });

    $(document).on('touchstart click', '.btn-pre', {}, (e) => {
        if (isNeedPreventClickEnvent(e)) {
            return false;
        }
        const $currentItem = $('.questionItem:visible');
        $currentItem.hide().prev().show();
        calProgress();
    });
    $(document).on('touchstart click', '.btn-next', {}, (e) => {
        if (isNeedPreventClickEnvent(e)) {
            return false;
        }
        const $currentItem = $('.questionItem:visible');
        $currentItem.hide().next().show();
        calProgress();
    });

    $(document).on('touchstart click', '.btn-start-chn', {}, (e) => {
        if (isNeedPreventClickEnvent(e)) {
            return false;
        }
        $('#homePage').addClass('hide');
        $('#questionPage').removeClass('hide');
        $('#changeLang').removeClass('langEn').addClass('langChn');
        calProgress();
    });
    $(document).on('touchstart click', '.btn-start-en', {}, (e) => {
        if (isNeedPreventClickEnvent(e)) {
            return false;
        }
        $('#homePage').addClass('hide');
        $('#questionPage').removeClass('hide');
        $('#changeLang').removeClass('langChn').addClass('langEn');
        $('input, textarea').attr('placeholder', '');
        calProgress();
    });
};


const IsPC = () => {
    const userAgentInfo = navigator.userAgent;
    const Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
    let flag = true;
    for (let v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
    }
    if (flag) {
        $('#root').addClass('pcStyle');
    } else {
        $('#root').removeClass('pcStyle');
    }
    return flag;
};

const init = () => {
    const isPc = IsPC();
    this.isPc = isPc;

    const optionArray = [];
    for (let i = 0; i <= 100; i++) {
        optionArray.push(`<option value="${i}">${i}</option>`);
    }
    const optionHtml = optionArray.join('');
    $('select').map((index, item) => {
        const $this = $(item);
        $this.html(optionHtml);
    });
    $('img[data-pc]').map((index, item) => {
        const $this = $(item);
        const src = isPc ? $this.attr('data-pc') : $this.attr('data-mobile');
        $this.attr('src', src);
    });
    $('#loading').remove();
    $('.questionItem').hide().eq(0).show();
    bindHandler();
};
init();
