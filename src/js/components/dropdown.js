/* BEGIN: Аккордеон */
const dropdownEl = '.js__dropdown'
const dropdownActive = 'dropdown-active'
const dropdownToggleEl = 'js__dropdown-toggle'

/**
 * @fileOverview
 * @author Zoltan Toth
 * @version 2.2.0
 */

/**
 * @description
 * Vanilla JavaScript dropdown - a tiny (~600 bytes gzipped) select tag replacement.
 *
 * @class
 * @param {(string|Object)} options.elem - HTML id of the select or the DOM element.
 */
export function dropdown() {
  document.querySelectorAll('.js__dropdown').forEach(function (dropDownWrapper) {
    const dropDownBtn = dropDownWrapper.querySelector('.js__dropdown-toggle');
    const dropDownList = dropDownWrapper.querySelector('.dropdown-menu');
    const dropDownListItems = dropDownList.querySelectorAll('.dropdown__list-item');
    const dropDownInput = dropDownWrapper.querySelector('.dropdown__input-hidden');

    // Клик по кнопке. Открыть/Закрыть select
    dropDownBtn.addEventListener('click', function (e) {
      console.log('Открыть/Закрыть')
      dropDownList.classList.toggle('dropdown__list--visible');
      this.closest(dropdownEl).classList.toggle(dropdownActive);
    });

    // Выбор элемента списка. Запомнить выбранное значение. Закрыть дропдаун
    /*dropDownListItems.forEach(function (listItem) {
      listItem.addEventListener('click', function (e) {
        //e.stopPropagation();
        //dropDownBtn.innerText = this.innerText;
        //dropDownBtn.focus();
        //dropDownInput.value = this.dataset.value;
        //dropDownList.classList.remove('dropdown__list--visible');
      });
    });*/

    // Клик снаружи дропдауна. Закрыть дропдаун
    document.addEventListener('click', function (e) {
      console.log('Закрыть дропдаун')
      if (e.target !== dropDownBtn) {
        dropDownBtn.closest(dropdownEl).classList.remove(dropdownActive);
        dropDownList.classList.remove('dropdown__list--visible');
      } else if (e.target !== dropDownList) {
        dropDownBtn.closest(dropdownEl).classList.add(dropdownActive);
      }
    });

    // Нажатие на Tab или Escape. Закрыть дропдаун
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Tab' || e.key === 'Escape') {
        dropDownBtn.closest(dropdownEl).classList.remove(dropdownActive);
        dropDownList.classList.remove('dropdown__list--visible');
      }
    });
  });
}

/* END */
