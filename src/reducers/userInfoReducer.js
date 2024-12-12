import constants from './../constants';
const { types, initialState } = constants;

const userInfoReducer = (state = initialState.userInfoState, action) => {
  switch (action.type) {
    case types.SET_USER_INFO:
      return action.payload;
    default:
      return state;
  }
};

export default userInfoReducer;
