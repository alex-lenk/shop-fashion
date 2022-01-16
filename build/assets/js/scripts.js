'use strict';

function toggle() {
  document.querySelector('body').classList.toggle('menu__open')
}

document.querySelector('.js-top__toggle').addEventListener('click', function () {
  toggle()
})

document.querySelector('.js-menu__close').addEventListener('click', function () {
  toggle()
})