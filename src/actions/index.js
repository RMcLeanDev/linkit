import constants from './../constants';
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/database";
import {store} from './../index';
import axios from 'axios';
import moment from 'moment';

const {types, firebaseConfig} = constants;

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(function(user) {
  if(user){
    store.dispatch(authUserTrue());
    firebase.database().ref().on('value', function(snapshot){
      store.dispatch(getAllFromDB(snapshot.val()));
    })
    getResponse();
  } else {
    store.dispatch(authUserFalse());
  }
})

function getResponse(){
  let data = JSON.stringify({
      "query": "# Write your query or mutation here\nquery {\n  devices(query: {}, first: 200) {\n    page {\n      edges {\n        node {\n          UUID\n          deviceName\n          lastHeartBeat\n        }\n      }\n    }\n  }\n}\n"
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://graphql-gateway.optisigns.com/graphql',
      headers: { 
        //'Accept-Encoding': 'gzip, deflate, br', 
        'Content-Type': 'application/json', 
        'Accept': 'application/json', 
        //'Connection': 'keep-alive', 
        //'DNT': '1', 
        //'Origin': 'https://graphql-gateway.optisigns.com', 
        'authorization': process.env.REACT_APP_SCREENS_API
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      let obj = {lastDevicesUpdate: Date.now()};
      for(let i = 0; i<response.data.data.devices.page.edges.length; i++){
        let dateLocal = new Date(response.data.data.devices.page.edges[i].node.lastHeartBeat)
        obj[response.data.data.devices.page.edges[i].node.UUID] = {"UUID": response.data.data.devices.page.edges[i].node.UUID, "deviceName": response.data.data.devices.page.edges[i].node.deviceName, "lastHeartBeat": Date.parse(dateLocal)};
      }
      firebase.database().ref('devices').set(obj)
    })
    .catch((error) => {
      console.log(error);
    });
}

export const testFunction = () => ({
  type: types.TEST_FUNCTION
})

export const authUserTrue = () => ({
  type: types.AUTH_USER_TRUE
})

export const authUserFalse = () => ({
  type: types.AUTH_USER_FALSE
})

export const getAllFromDB = (info) => ({
  type: types.GET_ALL_FROM_DB,
  info
})

export const updateOnlineStatus = (info) =>{
  firebase.database().ref(`venues/${info.venue.id}`).update({online: info.newStatus})
}

export const updateVenueStatus = (info) => {
  firebase.database().ref(`venues/${info.venue.id}`).update({status: info.text})
}