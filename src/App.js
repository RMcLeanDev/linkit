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
import VenuesMain from './components/Venues/VenuesMain';
import DevicesMain from './components/Devices/DevicesMain';

function App(props) {
  let display;
  //<Route exact path='/venues/:id' element={<DisplayVenue venue={props.db.venues}/>}/>
  if(props.authUser && props.db){
    display = <div>
      <MobileFooter />
      <Routes>
        <Route exact path='/' element={<Home />}/>
        <Route exact path='/supportRequest' element={<SupportRequest />}/>
        <Route exact path='/venues' element={<VenuesMain venues={props.db.venues}/>} />
        <Route exact path='/devices' element={<DevicesMain devices={props.db.devices}/>} />
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
  authUser: state.authState,
  db: state.dbState
})

export default connect(mapStateToProps)(App);