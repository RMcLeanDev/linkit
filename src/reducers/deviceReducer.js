import { SET_DEVICES_DATA } from "../constants/ActionTypes";
import { initialState } from "../constants/InitialState";

const devicesReducer = (state = initialState.devices, action) => {
  switch (action.type) {
    case SET_DEVICES_DATA:
      return action.payload;
    default:
      return state;
  }
};

export default devicesReducer;
