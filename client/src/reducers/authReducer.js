import { FETCH_USER } from "../actions/actionTypes";

export default function authReducer (state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload.data || false;
    default:
      return state;
  }
};
