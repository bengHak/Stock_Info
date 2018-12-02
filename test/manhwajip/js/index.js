/*
 * Copyright 2017 NAVER Corp.
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const exports = {};

function require(name) {
    return exports[name];
}

//////////////////////////////////////////////////
///////////////////// Header /////////////////////
//////////////////////////////////////////////////

(function() {
    const header = {
        init() {
            this.id = this.getPageId();
            this.timer = 0;
            this.delegator = createDelegator(document.body);
            this.emitter = new EventEmitter3();
            this.assignElements();
            this.render();
            this.bindEvents();
            this.updateIndicator();
            setTimeout(() => {
                this.indicator.style.transition = 'transform .2s ease-out'
            }, 0);
        },

        assignElements() {
            this.tabs = document.querySelector('.header__tab-list');
            this.indicator = document.querySelector('.header__tab-indicator');
        },

        bindEvents() {
            window.addEventListener('hashchange', this.onHashchange.bind(this));
            window.addEventListener('resize', this.onResizeWindow.bind(this));
            this.delegator.on('click', '.header__tab-link', () => {
                setTimeout(() => {
                    this.emitter.emit('change', this.id);
                }, 0)
            });
        },

        getPageId() {
            return location.hash.replace('#', '') || 'all';
        },

        updateIndicator() {
            const index = __COMPANY_GROUP__.findIndex((g) => g.id === this.id);
            const target = this.tabs.querySelectorAll('.header__tab-item')[index];
            const {left, width} = target.getBoundingClientRect();
            this.indicator.style.width = `${width}px`;
            this.indicator.style.transform = `translate3d(${left}px,0,0)`;
        },

        render() {
            this.tabs.insertAdjacentHTML('beforeend', `${__COMPANY_GROUP__.map(({id, name}) => `
                <li class="header__tab-item ${id === this.id ? 'header__tab-item--active' : ''}">
                    <a href="#${id}" class="header__tab-link">${name}</a>
                </li>
            `).join('')}`)
        },

        onHashchange() {
            this.id = this.getPageId();
            const items = this.tabs.querySelectorAll('.header__tab-item');
            items.forEach((tab) => {
                tab.classList.remove('header__tab-item--active');
                if (`#${this.id}` === tab.querySelector('.header__tab-link').getAttribute('href')) {
                    tab.classList.add('header__tab-item--active')
                }
            });
            this.updateIndicator();
        },

        onResizeWindow() {
            this.indicator.style.transition = 'none';
            this.updateIndicator();
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.indicator.style.transition = 'transform .2s ease-out'
            }, 500);
        }
    };

    header.init();
    exports.header = header;
})();


//////////////////////////////////////////////////
////////////////////// Main //////////////////////
//////////////////////////////////////////////////

(function() {
    const header = require('header');
    const main = {
        init() {
            this.assignElements();
            this.bindEvents();
            this.render();
            this.activePage(header.id);
        },

        assignElements() {
            this.main = document.querySelector('.main__inner');
        },

        bindEvents() {
            header.emitter.on('change', this.onChangeHeader.bind(this));
        },

        render() {
            this.main.insertAdjacentHTML('beforeend', __COMPANY_GROUP__.map((group) =>
                group.id === 'all' ? `
                     <div class="page page--all">
                        ${__COMPANY_GROUP__.map((group) => (
                            group.id !== 'all' ? this.compileGroup(group) : ''
                        )).join('')}
                     </div>
                ` : `
                    <div class="page page--${group.id}">
                        ${this.compileGroup(group, false)}
                    </div>
                `
            ).join(''));
        },

        compileGroup({alias, companies}, showTitle = true) {
            return `
                <section class="manhwa-company">
                    <div class="manhwa-company__inner">
                        <h2 class="manhwa-company__title ${!showTitle ? 'blind' : ''}">${alias}</h2>
                        <ul class="manhwa-company__list">
                            ${companies.map((company) => 
                                this.compileItem(company)).join('')
                            }
                        </ul>
                    </div>
                </section>
            `;
        },

        compileItem({name, link, logo, logoShadow}) {
            return `
                <li class="manhwa-company__item">
                    <div class="site-card">
                        <a class="site-card__link" href="${link}">
                            <div class="site-card__media ${logoShadow ? 'site-card__media--shadow' : ''}">
                                <div class="site-card__image" data-src="./logos/${logo}.png"></div>
                            </div>
                            <div class="site-card__title">
                                <span>${name}</span>
                            </div>
                        </a>
                    </div>
                </li>
            `;
        },

        activePage(id) {
            const pages = this.main.querySelectorAll('.page');
            pages.forEach((page) => {
                page.style.display = 'none';
                if (page.classList.contains(`page--${id}`)) {
                    page.style.display = 'block';
                }
            });
        },

        onChangeHeader(id) {
            this.activePage(id);
        }
    };

    main.init();
    Tada.add('.site-card__image');
    exports.main = main;
})();
