import React from 'react';
import './index.scss';
import App from './App';
import { HashRouter } from 'react-router-dom';
//import * as serviceWorker from './serviceWorker';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import {Provider} from 'react-redux';
import './actions';

import {createRoot} from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container);
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export {store};

root.render(
  <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
)