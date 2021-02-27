import { PRODUCT_ADD_PARTS, productActionTypes, productState } from './types';

const initialState: productState = {
  parts: [],
};

/**
 * @param state
 * @param action
 */
export function productReducer(state = initialState, action: productActionTypes): productState {
  switch (action.type) {
    case PRODUCT_ADD_PARTS:
      // Create new product logic
      return {
        ...state,
        parts: action.payload
        // add new state here
      };
    default:
      return state;
  }
}
