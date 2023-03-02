import constants from './../constants';
const {types, venueState} = constants

const venueReducer = (state = venueState, action) => {
  let newState;
  switch (action.type) {
    case types.GET_VENUES:
      newState = action.info;
      return newState;
    default:
      return state;
  }
}

export default venueReducer