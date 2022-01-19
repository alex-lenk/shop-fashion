/* BEGIN: Аккордеон */
export function _accordionCollapse(selector, selectorActive) {
  let
    menuList = document.getElementsByClassName(selector),
    i = 0;

  for (i; i < menuList.length; i++) {
    menuList[i].addEventListener('click', function () {
      this.classList.toggle(selectorActive)
    })
  }
}

/* END */
