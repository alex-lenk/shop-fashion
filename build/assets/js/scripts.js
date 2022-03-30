'use strict'
import {_accordionCollapse} from './components/_accordion-collapse.js'
import {dropdown} from './components/_dropdown.js'

/* BEGIN: Инициализация аккордеона */
_accordionCollapse('js-collapse', 'acc__active');
/* END */


document.addEventListener('DOMContentLoaded', () => {
  /* BEGIN: Инициализация dropdown */
  dropdown()
  /* END */
})


/* BEGIN: Открытие и закрытие панели меню */
function toggle() {
  document.querySelector('body').classList.toggle('b-menu__open')
}

document.querySelector('.js-top__toggle').addEventListener('click', () => toggle())

document.querySelector('.js-menu__close').addEventListener('click', () => toggle())
/* END */


/* BEGIN: Импорт и инициализация плагина слайдера */
import Glide from '@glidejs/glide'

let glideEl = document.querySelector('.glide')

if (glideEl) {
  new Glide('.glide').mount()
}
/* END */
