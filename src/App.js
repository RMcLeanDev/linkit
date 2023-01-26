import React from 'react';
import './App.scss';
import { store } from './';
import {testFunction} from './actions/index';

function App() {
  return (
    <div className="App">
      <h1>Click the button:</h1>
      <button onClick={() => store.dispatch(testFunction())}>TEST</button>
    </div>
  );
}

export default App;
