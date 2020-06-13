import { UPDATE_VALUE } from './actionTypes';

export const addFavorites = value => ({
    type: UPDATE_VALUE,
    favorites: value
});