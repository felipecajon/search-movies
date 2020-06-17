import { UPDATE_VALUE, UPDATE_MOVIE } from './actionTypes';

export const addFavorites = value => ({
    type: UPDATE_VALUE,
    favorites: value
});

export const addMovie = value => ({
    type: UPDATE_MOVIE,
    movie: value
});