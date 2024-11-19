const initialState = {
    playlists: {},
  };
  
  export const playlistReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_PLAYLISTS":
        return {
          ...state,
          playlists: action.playlists,
        };
      default:
        return state;
    }
  };
  