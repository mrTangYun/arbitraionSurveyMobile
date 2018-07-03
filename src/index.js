// import React from 'react';
// import ReactDOM from 'react-dom';
import './index.css';
import './style.scss';
import $ from 'jquery';
// import App from './App';

// ReactDOM.render(<App />, document.getElementById('root'));

const $prograssBar=$('.progress-bar');
const questionCount = $('.questionItem').length;

const switchLanguage = (lan) => {
    let options = this.optionsNeedChangeLan;
    if (!options) {
        options = [];
        $('option').each((item, e) => {
            const $this = $(e);
            const text = $this.text();
            if (/^\d+以上$/.test(text)) {
                options = [...options, {
                    element: e,
                    chn: text,
                    en: text.replace(/(\d+)(以上)/, 'above $1')
                }];
            }
        })
    }
    options.map(item => {
        $(item.element).text(item[lan]);
        return null;
    });
    this.optionsNeedChangeLan = options;
};

const isNeedPreventClickEnvent = (e) => {
    if (e.type === 'click') {
        return !this.isPc;
    } else {
        return this.isPc;
    }
};

const dialog = {
    show: () => {
        $('#dialog').show();
    },
    hide: () => {
        $('#dialog').hide();
    }
};

const calProgress = () => {
    const index = $('.questionItem:visible').index('.questionItem');
    const width = (index + 1) / questionCount * 100;
    $prograssBar.css('width', width + '%');
    if (index === 0) {
        $('.btn-pre').hide();
    } else {
        $('.btn-pre').show();
    }
    if (index + 1 === questionCount) {
        $('.btn-next').hide();
        $('.btn-submit').show();
    } else {
        $('.btn-next').show();
        $('.btn-submit').hide();
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

    $(document).on('touchstart click', '.btn-start-chn img', {}, (e) => {
        if (isNeedPreventClickEnvent(e)) {
            return false;
        }
        $('#homePage').addClass('hide');
        $('#questionPage').removeClass('hide');
        $('#changeLang, #dialog').removeClass('langEn').addClass('langChn');
        switchLanguage('chn');
        fixIe9();
        calProgress();
    });
    $(document).on('touchstart click', '.btn-start-en img', {}, (e) => {
        if (isNeedPreventClickEnvent(e)) {
            return false;
        }
        $('#homePage').addClass('hide');
        $('#questionPage').removeClass('hide');
        $('#changeLang, #dialog').removeClass('langChn').addClass('langEn');
        $('input, textarea').attr('placeholder', '');
        switchLanguage('en');
        fixIe9();
        calProgress();
    });
    $(document).on('touchstart click', '.btn-complete', {}, (e) => {
        if (isNeedPreventClickEnvent(e)) {
            return false;
        }
        $('#homePage').removeClass('hide');
        $('#questionPage').addClass('hide');
        $('#changeLang').removeClass('langChn').removeClass('langEn');
        dialog.hide();
        $('.questionItem').eq(0).show().siblings().hide();
        calProgress();
    });


    $(document).on('touchstart click', '.btn-submit', {}, (e) => {
        if (isNeedPreventClickEnvent(e)) {
            return false;
        }
        dialog && dialog.show();
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

const fixIe9 = () => {
    if (!$("#root").hasClass('ie9')) {
        return false;
    }
    const height = $('#changeLang').height() - $('.commonBottom').outerHeight();
    $('.qustionContainer').css('height', height + 'px');
    $('.commonBottom .buttons').html(`
                        <div class="btn-submit"></div>
                        <div class="btn-next"></div>
                        <div class="btn-pre"></div>
                        <div class="clearFloat"></div>
    `);
};


const init = () => {
    const userAgentInfo = navigator.userAgent;
    if (userAgentInfo.indexOf('MSIE 9') > 0){
        $("#root").addClass('ie9');
    }
    const isPc = IsPC();
    this.isPc = isPc;
    // const optionArray = [];
    // for (let i = 0; i <= 100; i++) {
    //     optionArray.push(`<option value="${i}">${i}</option>`);
    // }
    // const optionHtml = optionArray.join('');
    // $('select').map((index, item) => {
    //     const $this = $(item);
    //     $this.html(optionHtml);
    // });
    $('img[data-pc]').map((index, item) => {
        const $this = $(item);
        const src = isPc ? $this.attr('data-pc') : $this.attr('data-mobile');
        $this.attr('src', src);
    });
    $('#loading').remove();
    $('.questionItem').hide().eq(0).show();
    bindHandler();
    window.$ = $;
    window.dialog = dialog;
};
init();
