import constants from './../constants';
const { types, initialState } = constants;

const playlistReducer = (state = initialState.playlistState, action) => {
  switch (action.type) {
    case types.SET_USER_PLAYLISTS:
      return action.payload; 
    default:
      return state;
  }
};

export default playlistReducer;
