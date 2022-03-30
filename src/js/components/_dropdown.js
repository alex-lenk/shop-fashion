/* BEGIN: Аккордеон */
const dropdownEl = '.js__dropdown'
const dropdownActive = 'dropdown-active'
const dropdownToggleEl = 'js__dropdown-toggle'
const dropdownMenu = '.dropdown-menu'
const js__dropdown = document.querySelectorAll(dropdownEl);

function removeActiveDropdown() {
  js__dropdown.forEach(item => {
    item.classList.remove(dropdownActive)
  })
}

export function dropdown() {
  document.addEventListener('click', e => {
    let target = e.target;

    if (target.closest(dropdownEl)?.classList.contains(dropdownActive) && !target.closest(dropdownMenu)) {
      target.closest(dropdownEl).classList.remove(dropdownActive)
    } else if (target.classList.contains(dropdownToggleEl)) {
      removeActiveDropdown()
      target.closest(dropdownEl).classList.add(dropdownActive)
    } else if (!target.closest(dropdownMenu)) {
      removeActiveDropdown()
    }
  })
}
/* END */
