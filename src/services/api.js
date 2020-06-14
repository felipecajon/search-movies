import axios from 'axios';
import * as configs from '../config.json';
import * as loader from '../components/loader';

let config = configs.default; 

export async function getMovie (newParams) {
    // const baseUrl = `http://localhost:3001/movie`;
    // return await axios.get(baseUrl);
    loader.init();

    let configSearch = {
        params: {
            'apikey': config.apiKey,
            'plot': 'full'
        }
    }

    if (newParams.title) {
        configSearch.params.t = newParams.title;
    }

    if (newParams.id) {
        configSearch.params.i = newParams.id;
    }
    
    const baseUrl = `https://www.omdbapi.com/`;
    const response = await axios.get(baseUrl, configSearch);
    
    loader.close();
    return response;
}
