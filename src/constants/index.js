import * as types from './ActionTypes';
import {initialState, authState, venueState } from './InitialState';
import firebaseConfig from './firebaseConfig';

export default {
  initialState: initialState,
  firebaseConfig: firebaseConfig,
  authState: authState,
  venueState: venueState,
  types: types
}