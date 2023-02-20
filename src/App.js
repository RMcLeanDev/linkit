import React from 'react';
import './App.scss';
import { store } from './';
import {testFunction} from './actions/index';
import MobileFooter from './components/MobileFooter';
import {Routes, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Login from './components/Login';
import Home from './components/Home';
import SupportRequest from './components/SupportRequest';
import Venues from './components/Venues';

function App(props) {
  let display;

  if(props.authUser){
    display = <div>
      <MobileFooter />
      <Routes>
        <Route exact path='/' element={<Home />}/>
        <Route exact path='/supportRequest' element={<SupportRequest />}/>
        <Route exact path='/venues' element={<Venues />} />
      </Routes>
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