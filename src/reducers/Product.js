import { ActionsTypes } from '../actions/Product';

// Initial State
const INITIAL_STATE = {
  loading: false,
  products: [],
  error: null
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    // Status
    case ActionsTypes.started:
      return {
        ...state,
        loading: true
      };
    case ActionsTypes.success:
      return {
        ...state,
        loading: false,
        error: null
      };
    case ActionsTypes.failure:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    // -------------------------
    case ActionsTypes.GET_ALL:
      return {
        ...state,
        products: action.payload
      };

    default:
      return state;
  }
}