import { middleReducer } from './middleReducer';
import { combineReducers } from 'redux';

export const Reducers = combineReducers({
  state: middleReducer,
});