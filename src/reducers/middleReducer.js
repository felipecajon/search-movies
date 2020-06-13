import { UPDATE_VALUE } from '../actions/actionTypes';

const initialState = {
  favorites: []
};

export const middleReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_VALUE:
      return {
        ...state,
        favorites: action.favorites
      };
    default:
      return state;
  }
};