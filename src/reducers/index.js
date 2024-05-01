import {combineReducers} from 'redux';
import testReducer from './testReducer';
import authReducer from './authReducer';
import dbReducer from './dbReducer';
import userRoleReducer from './userRoleReducer';

const rootReducer = combineReducers({
    testState: testReducer,
    authState: authReducer,
    dbState: dbReducer,
    userRoleState: userRoleReducer
});

export default rootReducer;
