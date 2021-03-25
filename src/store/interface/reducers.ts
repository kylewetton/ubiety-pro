import _map from 'lodash/map';

import { INTERFACE_UPDATE_POINTER, INTERFACE_TOGGLE_MODAL, interfaceActionTypes, interfaceState } from './types';

const initialState: interfaceState = {
  pointer: {x: 0, y: 0},
  modalIsOpen: {
    customImage: 'closed',
    customText: 'closed',
  }
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
    case INTERFACE_TOGGLE_MODAL:
      /**
       * This will toggle all modals closed,
       * it will only open a single modal at a time
       * if isOpen is true in the action payload.
       */
      
      const newModals: {[key: string]: 'open' | 'closed'} = {};
      _map({...state.modalIsOpen}, (modal, key) => {
        if (key !== action.payload.id) {
          newModals[key] = 'closed';
       } else {
        newModals[key] = action.payload.status;
        }
      });

    return {
      ...state,
      modalIsOpen: newModals
    }
    default:
      return state;
  }
}
