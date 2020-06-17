import { UPDATE_VALUE, UPDATE_MOVIE } from '../actions/actionTypes';

const initialState = {
  favorites: JSON.parse(localStorage.getItem('searchMovies')) || [],
  movie: {}
};

export const middleReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_VALUE:
      localStorage.setItem('searchMovies', JSON.stringify(action.favorites))
      return {
        ...state,
        favorites: action.favorites,
      };

    case UPDATE_MOVIE:
      return {
        ...state,
        movie: action.movie
      };

    default:
      return state;
  }
};