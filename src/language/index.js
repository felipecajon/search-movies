import * as base_pt from './base_pt.json';

export function getText () {
    const language = 'pt_BR';
    let library = {};

    if (!language || language === 'pt_BR') {
        library = base_pt;
    }
    
    return library.default 
}