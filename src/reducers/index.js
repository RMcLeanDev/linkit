import {combineReducers} from 'redux';
import testReducer from './testReducer';
import authReducer from './authReducer';
import venueReducer from './venueReducer';

const rootReducer = combineReducers({
    testState: testReducer,
    authState: authReducer,
    venueState: venueReducer
});

export default rootReducer;
