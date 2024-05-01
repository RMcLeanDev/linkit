import constants from './../constants';
const {types, userRoleState} = constants

const userRoleReducer = (state = userRoleState, action) => {
  let newState;
  switch (action.type) {
    case types.SET_USER_ROLE:
      newState = state;
        newState = action.info;
      return newState;
    case types.DUMP_USER_ROLE:
      newState = state;
        newState = null;
      return newState;
    default:
      return state;
  }
}

export default userRoleReducer