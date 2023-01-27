import React from 'react';
import './App.scss';
import { store } from './';
import {testFunction} from './actions/index';
import MobileFooter from './components/MobileFooter';

function App() {
  return (
    <div className="App">
      <MobileFooter />
      <h1>Click the button: ljlaksdjfawinefonwweoinfoaifwweoinfoaifnaenfaljwjojefowienfoweinfowiefnwoeifnwefnwefnweoinfoaifnaenfaljwjojefowienfoweinfowiefnwoeifnwefnwefnweoinfoaifnaenfaljwjojefowienfoweinfowiefnwoeifnwefnwefnweoinfoaifnaenfaljwjojefowienfoweinfowiefnwoeifnwefnwefnweoinfoaifnaenfaljwjojefowienfoweinfowiefnwoeifnwefnwefnweoinfoaifnaenfaljwjojefowienfoweinfowiefnwoeifnwefnwefnweoinfoaifnaenfaljwjojefowienfoweinfowiefnwoeifnwefnwefneoinfoaifnaenfaljwjojefowienfoweinfowiefnwoeifnwefnwefneoinfoaifnaenfaljwjojefowienfoweinfowiefnwoeifnwefnwefnweoinfoaifnaenfaljwjojefowienfoweinfowiefnwoeifnwefnwefnaenfaljwjojefowienfoweinfowiefnwoeifnwefnwefn</h1>
      <p>wionefiowenfoweinfweoinfoaifnaenfaljwjojefowienfoweinfowiefnwoeifnwefnwefnweoinjwoiefjwoeifjowiej</p>
      <button onClick={() => store.dispatch(testFunction())}>TEST</button>
      <p className="gap"/>
    </div>
  );
}

export default App;
