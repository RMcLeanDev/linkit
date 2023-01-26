import React from 'react';
import './App.scss';
import { store } from './';
import {testFunction} from './actions/index';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Footer />
      <h1>Click the button: </h1>
      <button onClick={() => store.dispatch(testFunction())}>TEST</button>
    </div>
  );
}

export default App;
