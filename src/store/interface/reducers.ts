import { INTERFACE_UPDATE_POINTER, interfaceActionTypes, interfaceState } from './types';

const initialState: interfaceState = {
  pointer: {x: 0, y: 0}
};

/**
 * @param state
 * @param action
 */
export function interfaceReducer(state = initialState, action: interfaceActionTypes): interfaceState {
  switch (action.type) {
    case INTERFACE_UPDATE_POINTER:
      // Create new interface logic
      return {
        ...state,
        pointer: action.payload
      };
    default:
      return state;
  }
}
