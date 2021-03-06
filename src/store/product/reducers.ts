import { PRODUCT_ADD_MESHPARTS, PRODUCT_ADD_MATERIALS, PRODUCT_SET_ACTIVE, PRODUCT_SET_TEXTURE, PRODUCT_SET_COLOR, productActionTypes, productState, PRODUCT_ADD_MODEL_DATA } from './types';
import {shapeSectionData, shapeTextureData} from '../../utils';
import {productPartType} from './types';

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
      
      const newSectionsWithMeshParts = [...state.sections].map(section => {
        const newSec = {...section};
        const [part] = action.payload.filter((part: productPartType) => part.tag === section.tag);
        newSec.meshPart = part.id;
        return newSec;
      });

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
        sections: newSectionsWithMeshParts,
        meshParts
        // add new state here
      };
      
    case PRODUCT_SET_ACTIVE:
    // action.payload === mesh.uuid

    const [meshByIdOrParentOrChildren] = state.meshParts
    .filter(meshPart => meshPart.id === action.payload ||
      meshPart.parent === action.payload ||
      meshPart.children.includes(action.payload));

    const newSectionsNewActive = [...state.sections].map(section => {
        const ns = {...section};
        if (ns.meshPart !== meshByIdOrParentOrChildren.id) {
          ns.active = false;
          return ns;
        }
        ns.active = true;
        return ns;
    });

      return {
        ...state,
        sections: newSectionsNewActive,
      };

    case PRODUCT_SET_TEXTURE:
      // payload === material.uid
      const [newMaterial] = state.materials.filter(material => material.uid === action.payload);
      const newActiveSections = [...state.sections].map(section => {
        const ns = {...section};
        if (!ns.active)
          return ns;
        ns.current_material = newMaterial;
        return ns;
      });

      return {
        ...state,
        sections: newActiveSections
      };
    
    case PRODUCT_SET_COLOR:
         // payload === material.uid
         const newColorSections = [...state.sections].map(section => {
           const ns = {...section};
           if (!ns.active)
             return ns;
           ns.color = action.payload;
           return ns;
         });
   
         return {
           ...state,
           sections: newColorSections
         };

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
