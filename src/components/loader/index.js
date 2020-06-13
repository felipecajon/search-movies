import './style.scss';

function loaderTemplate (text = 'Carregando...') {
    const htmlContent = `
        <div class="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div class="js-lds-ellipsis-text lds-ellipsis-text">
            ${text}
        </div>
    `;

    var loaderContainer = document.createElement('div');
    loaderContainer.classList = 'container-loader js-loader';
    loaderContainer.innerHTML = htmlContent

    return loaderContainer 
}

export function init (text = 'Carregando...') {
    let $body = document.querySelectorAll('body')[0];
    $body.className += ' overflow-hidden is-loading';
    $body.append(loaderTemplate(text));

    const $loader = document.querySelectorAll('.js-loader')[0];
    $loader.className += ' active';
}

export function close () {
    let $body = document.querySelectorAll('body')[0];
    $body.classList.remove("overflow-hidden");
    $body.classList.remove("is-loading");

    const $loader = document.querySelectorAll('.js-loader')[0];
    $loader.classList.remove('active');
    $loader.remove();
}