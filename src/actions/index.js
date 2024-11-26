import constants from './../constants';
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/database";
import {store} from './../index';
import axios from 'axios';

const {types, firebaseConfig} = constants;

firebase.initializeApp(firebaseConfig);

export let userID;

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    store.dispatch(authUserTrue());
    firebase.database().ref().on('value', function(snapshot) {
      store.dispatch(getAllFromDB(snapshot.val()));
    });
    firebase.database().ref(`users/${user.uid}`).on('value', function(snapshot) {
      let info = snapshot.val();
      let obj = { userid: user.uid, info };
      store.dispatch(setUserRole(obj));
    });
    userID = firebase.auth().currentUser.uid
    getResponse();
  } else {
    store.dispatch(authUserFalse());
  }
});

function getResponse() {
  let data = JSON.stringify({
    query: `
      query {
        devices(query: {}, first: 200) {
          page {
            edges {
              node {
                UUID
                deviceName
                lastHeartBeat
              }
            }
          }
        }
      }
    `
  });
    
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://graphql-gateway.optisigns.com/graphql',
    headers: { 
      'Content-Type': 'application/json', 
      'Accept': 'application/json', 
      'authorization': process.env.REACT_APP_SCREENS_API
    },
    data: data
  };
    
  axios.request(config)
    .then((response) => {
      let obj = { lastDevicesUpdate: Date.now() };
      for (let i = 0; i < response.data.data.devices.page.edges.length; i++) {
        let dateLocal = new Date(response.data.data.devices.page.edges[i].node.lastHeartBeat);
        obj[response.data.data.devices.page.edges[i].node.UUID] = {
          UUID: response.data.data.devices.page.edges[i].node.UUID,
          deviceName: response.data.data.devices.page.edges[i].node.deviceName,
          lastHeartBeat: Date.parse(dateLocal)
        };
      }
      firebase.database().ref('devices').update(obj)
    })
    .catch((error) => {
      console.log(error);
    });
}

export const testFunction = () => ({
  type: types.TEST_FUNCTION
});

export const authUserTrue = () => ({
  type: types.AUTH_USER_TRUE
});

export const authUserFalse = () => ({
  type: types.AUTH_USER_FALSE
});

export const getAllFromDB = (info) => ({
  type: types.GET_ALL_FROM_DB,
  info
});

export const updateOnlineStatus = (info) => {
  firebase.database().ref(`venues/${info.venue.id}`).update({ online: info.newStatus });
};

export const updateVenueStatus = (info) => {
  firebase.database().ref(`venues/${info.venue.id}`).update({ status: info.text });
};

export const setUserRole = (info) => ({
  type: types.SET_USER_ROLE,
  info
});

