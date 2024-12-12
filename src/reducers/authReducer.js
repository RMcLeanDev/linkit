import constants from './../constants';
const { types, initialState } = constants;

const authReducer = (state = initialState.authState, action) => {
  switch (action.type) {
    case types.AUTH_USER_TRUE:
      return true;
    case types.AUTH_USER_FALSE:
      return false;
    default:
      return state;
  }
};

export default authReducer;
