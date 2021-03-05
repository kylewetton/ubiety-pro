import { PRODUCT_ADD_MESHPARTS, PRODUCT_ADD_MATERIALS, PRODUCT_SET_ACTIVE, PRODUCT_SET_TEXTURE, PRODUCT_SET_COLOR, productActionTypes, productState, PRODUCT_ADD_MODEL_DATA } from './types';
import {shapeSectionData, shapeTextureData} from '../../utils';

const initialState: productState = {
  loadingMeshParts: true,
  loadingModelData: true,
  loadingMaterials: true,
  meshParts: [],
  materials: [],
  sections: [],
  src: ''
};

/**
 * @param state
 * @param action
 */
export function productReducer(state = initialState, action: productActionTypes): productState {
  switch (action.type) {
    case PRODUCT_ADD_MESHPARTS:
      const meshParts = action.payload.map((part: any) => {
        if (part.tag !== 'quarters')
          return part;
        part.active = true;
        return part;
      });
      // Create new product logic
      return {
        ...state,
        loadingMeshParts: false,
        meshParts
        // add new state here
      };
      
    case PRODUCT_SET_ACTIVE:

    let refTag: string | null = null;

      const newActiveMeshParts = state.meshParts.map(part => {
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
        // Has exact match
        refTag = newPart.tag;     
        newPart.active = true;
        return newPart;
      });

      const newSections = state.sections.map(section => {
        const nSection = {...section};
        if (nSection.tag !== refTag) {
          nSection.active = false;
          return nSection;
        }
        nSection.active = true;
        return nSection;
      })

      return {...state, meshParts: newActiveMeshParts, sections: newSections};

    case PRODUCT_SET_TEXTURE:
      const material = state.materials.filter(material => material.tag === action.payload)[0];
      const newTextureMeshParts = state.meshParts.map(part => {
        const newPart = {...part};
        if (!newPart.active) return newPart;
        newPart.materialTag = material.tag;
        return newPart;
      });

      return {...state, meshParts: newTextureMeshParts};
    
    case PRODUCT_SET_COLOR:
      const newColorMeshParts = state.meshParts.map(part => {
        const newPart = {...part};
        if (!newPart.active) return newPart;
        newPart.color = action.payload;
        return newPart;
      });

      return {...state, meshParts: newColorMeshParts};

    case PRODUCT_ADD_MATERIALS:
      // Create new materials logic
      return {
        ...state,
        loadingMaterials: false,
        materials: [...state.materials, ...action.payload]
        // add new state here
      };

    case PRODUCT_ADD_MODEL_DATA:
      const {model_file, shadow_file, sections} = action.payload.acf;
      const [shadow_material] = shapeTextureData([shadow_file], true);
      shadow_material.maps = ['alpha'];
      return {
        ...state,
        src: model_file,
        loadingModelData: false,
        materials: [shadow_material, ...state.materials],
        sections: shapeSectionData(sections)
      };

    default:
      return state;
  }
}
