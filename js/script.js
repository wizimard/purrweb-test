function clickCookieHandler() {
    document.getElementById('cookie').className += ' cookie__hide';

    setTimeout(() => {
        document.getElementById('cookie').style.display = 'none';
    }, 5000)
}
function clickFormButtonHandler(e) {
    e.preventDefault();

    const form = document.querySelector('.footer-form');
    const inputCollection = form.getElementsByTagName('input');
    const textarea = form.getElementsByTagName('textarea')[0];

    for (let input of inputCollection) {
        if (!input.value) input.className += ' footer-form__item_invalid';
    }

    if (!textarea.value) textarea.className += ' footer-form__item_invalid';
}
function changeFormItemHandler(e) {
    e.target.className = e.target.className.replace(' footer-form__item_invalid', '');
}
function addEventListenersToFormItems() {
    const form = document.querySelector('.footer-form');
    const inputCollection = form.getElementsByTagName('input');
    const textarea = form.getElementsByTagName('textarea')[0];

    for (let input of inputCollection) {
        input.addEventListener('change', changeFormItemHandler);
    }

    textarea.addEventListener('change', changeFormItemHandler);

}

window.onload = () => {
    document.querySelector('.cookie__btn').addEventListener('click', clickCookieHandler);

    document.querySelector('.footer-form__btn').addEventListener('click', clickFormButtonHandler);

    addEventListenersToFormItems();
}