import { PRODUCT_ADD_PARTS, PRODUCT_ADD_MATERIALS, PRODUCT_SET_ACTIVE, PRODUCT_SET_TEXTURE, PRODUCT_SET_COLOR, productActionTypes, productState, PRODUCT_ADD_MODEL_DATA } from './types';
import {shapeTextureData} from '../../utils';

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
        // When it doesn't match clicked item
        if (newPart.id !== action.payload) {
          // Active by default
          newPart.active = false;

          // If its parent or child matches
          if (
              newPart.parent === action.payload
              || newPart.children.includes(action.payload)
            ) {
              newPart.active = true;
            }  
          return newPart;
        }     
        newPart.active = true;
        return newPart;
      });

      return {...state, parts: newActiveParts};

    case PRODUCT_SET_TEXTURE:
      const material = state.materials.filter(material => material.tag === action.payload)[0];
      const newTextureParts = state.parts.map(part => {
        const newPart = {...part};
        if (!newPart.active) return newPart;
        newPart.materialTag = material.tag;
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
        materials: [...state.materials, ...action.payload]
        // add new state here
      };

    case PRODUCT_ADD_MODEL_DATA:
      const {model_file, shadow_file} = action.payload.acf;
      const [shadow_material] = shapeTextureData([shadow_file], true);
      shadow_material.maps = ['alpha'];
      return {
        ...state,
        src: model_file,
        materials: [shadow_material, ...state.materials]
        // add new state here
      };

    default:
      return state;
  }
}
