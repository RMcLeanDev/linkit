import constants from './../constants';
const {types, dbState} = constants

const dbReducer = (state = dbState, action) => {
  let newState;
  switch (action.type) {
    case types.GET_ALL_FROM_DB:
      newState = action.info;
      return newState;
    default:
      return state;
  }
}

export default dbReducer