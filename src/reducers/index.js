import { combineReducers } from 'redux';
import testReducer from './testReducer';
import authReducer from './authReducer';
import userInfoReducer from './userInfoReducer';
import screensReducer from './screensReducer';
import playlistReducer from './playlistReducer';
import devicesReducer from './deviceReducer';

const rootReducer = combineReducers({
    testState: testReducer,
    authState: authReducer,
    userInfoState: userInfoReducer,
    screensState: screensReducer,
    playlistState: playlistReducer,
    devices: devicesReducer
});

export default rootReducer;