import * as types from './ActionTypes';
import {initialState, authState, dbState } from './InitialState';
import firebaseConfig from './firebaseConfig';

export default {
  initialState: initialState,
  firebaseConfig: firebaseConfig,
  authState: authState,
  dbState: dbState,
  types: types
}