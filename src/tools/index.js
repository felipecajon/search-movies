export function removeFromArray (array, value) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && array.length) {
        what = a[--L];
        while ((ax= array.indexOf(what)) !== -1) {
            array.splice(ax, 1);
        }
    }
    return array;
}

export function getParamsURL (name, url) {
    url = arguments.length <= 1 || arguments[1] === undefined ? window.location.href : arguments[1];

    name = name.replace(/[[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}