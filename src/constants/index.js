import * as types from './ActionTypes';
import {initialState, authState, dbState, userRoleState } from './InitialState';
import firebaseConfig from './firebaseConfig';

export default {
  initialState: initialState,
  firebaseConfig: firebaseConfig,
  authState: authState,
  dbState: dbState,
  userRoleState: userRoleState,
  types: types
}