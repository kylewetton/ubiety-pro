import { PRODUCT_ADD_PARTS, PRODUCT_ADD_MATERIALS, PRODUCT_SET_ACTIVE, PRODUCT_SET_TEXTURE, PRODUCT_SET_COLOR, productActionTypes, productState, PRODUCT_ADD_MODEL_DATA } from './types';

const initialState: productState = {
  parts: [],
  materials: [],
  src: ''
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
          if (newPart.parent === action.payload)
            newPart.active = true;
          return newPart;
        }

        newPart.active = true;
        return newPart;
      });

      return {...state, parts: newActiveParts};

    case PRODUCT_SET_TEXTURE:
      const material = state.materials.filter(material => material.id === action.payload)[0];
      const newTextureParts = state.parts.map(part => {
        const newPart = {...part};
        if (!newPart.active) return newPart;
        newPart.textureFolder = material.src;
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

    case PRODUCT_ADD_MATERIALS:
      // Create new materials logic
      return {
        ...state,
        materials: action.payload
        // add new state here
      };

    case PRODUCT_ADD_MODEL_DATA:
      const {model_file} = action.payload.acf;
      console.log('xx', model_file);
      return {
        ...state,
        src: model_file
        // add new state here
      };

    default:
      return state;
  }
}
