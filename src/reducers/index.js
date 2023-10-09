import {combineReducers} from 'redux';
import testReducer from './testReducer';
import authReducer from './authReducer';
import dbReducer from './dbReducer';

const rootReducer = combineReducers({
    testState: testReducer,
    authState: authReducer,
    dbState: dbReducer
});

export default rootReducer;
