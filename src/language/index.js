export function getText () {
    const language = 'pt_BR';
    let library = {};

    if (!language || language === 'pt_BR') {
        library = require('./base_pt.json');
    }
    
    return library 
}