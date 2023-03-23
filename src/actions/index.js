import constants from './../constants';
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/database";
import {store} from './../index';

const {types, firebaseConfig} = constants;

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(function(user) {
  if(user){
    store.dispatch(authUserTrue());
    firebase.database().ref(`venues`).on('value', function(snapshot){
      store.dispatch(getVenues(snapshot.val()));
    })
  } else {
    store.dispatch(authUserFalse());
  }
})

export const testFunction = () => ({
  type: types.TEST_FUNCTION
})

export const authUserTrue = () => ({
  type: types.AUTH_USER_TRUE
})

export const authUserFalse = () => ({
  type: types.AUTH_USER_FALSE
})

export const getVenues = (info) => ({
  type: types.GET_VENUES,
  info
})

export const updateOnlineStatus = (info) =>{
  firebase.database().ref(`venues/${info.venue.id}`).update({online: info.newStatus})
}
