import { _u_box_u__ACTION, __box__ActionTypes, __box__State } from './types';

const initialState: __box__State = {
  
};

/**
 * @param state
 * @param action
 */
export function _l_box_l_Reducer(state = initialState, action: __box__ActionTypes): __box__State {
  switch (action.type) {
    case _u_box_u__ACTION:
      // Create new __box__ logic
      return {
        ...state,
        // add new state here
      };
    default:
      return state;
  }
}
