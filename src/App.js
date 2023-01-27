import React from 'react';
import './App.scss';
import { store } from './';
import {testFunction} from './actions/index';
import MobileFooter from './components/MobileFooter';
import {Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Login from './components/Login';

function App(props) {
  let display;

  if(props.authUser){
    display = <div>
      <MobileFooter />
      <button onClick={() => store.dispatch(testFunction())}>TEST</button>
      <p className="gap"/>
    </div>
  } else if(props.authUser === false){
    display = <div>
      <Login />
    </div>
  } else {
    display = <div>loading...</div>
  }
  return (
    <div className="App">
      {display}
    </div>
  );
}

const mapStateToProps = state => ({
  authUser: state.authState
})

export default connect(mapStateToProps)(App);