'use strict'

import {_accordionCollapse} from './components/_accordion-collapse.js'

/* BEGIN: Инициализация аккордеона */
_accordionCollapse('js-collapse', 'acc__active');
/* END */

/* BEGIN: Открытие и закрытие панели меню */
function toggle() {
  document.querySelector('body').classList.toggle('menu__open')
}

document.querySelector('.js-top__toggle').addEventListener('click', () => toggle())

document.querySelector('.js-menu__close').addEventListener('click', () => toggle())

/* END */


/* BEGIN: Открытие и закрытие фильтра в каталоге */
document.querySelector('.js-filter__label').addEventListener('click', function () {
  this.classList.toggle('filter__open')
})
/* END */
