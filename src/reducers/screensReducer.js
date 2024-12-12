import constants from './../constants';
const { types, initialState } = constants;

const screensReducer = (state = initialState.screensState, action) => {
  switch (action.type) {
    case types.SET_USER_SCREENS:
      return action.payload;
    default:
      return state;
  }
};

export default screensReducer;
