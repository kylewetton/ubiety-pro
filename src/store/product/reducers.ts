import { PRODUCT_ADD_PARTS, PRODUCT_SET_ACTIVE, PRODUCT_SET_TEXTURE, PRODUCT_SET_COLOR, productActionTypes, productState } from './types';

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
    case PRODUCT_SET_ACTIVE:

      const newActiveParts = state.parts.map(part => {
        const newPart = {...part};
        if (newPart.id !== action.payload) {
          newPart.active = false;
          return newPart;
        }
        newPart.active = true;
        return newPart;
      });

      return {...state, parts: newActiveParts};

    case PRODUCT_SET_TEXTURE:
      const newTextureParts = state.parts.map(part => {
        const newPart = {...part};
        if (!newPart.active) return newPart;
        newPart.textureFolder = action.payload;
        return newPart;
      });

      return {...state, parts: newTextureParts};
    
    case PRODUCT_SET_COLOR:
      const newColorParts = state.parts.map(part => {
        const newPart = {...part};
        if (!newPart.active) return newPart;
        newPart.color = action.payload;
        return newPart;
      });

      return {...state, parts: newColorParts};

    default:
      return state;
  }
}
