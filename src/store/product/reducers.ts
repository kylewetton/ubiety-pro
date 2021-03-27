import { PRODUCT_ADD_MESHPARTS, PRODUCT_ADD_MATERIALS, PRODUCT_ADD_CART_VARIATION_IDS, PRODUCT_SET_STAMPA_STYLE, PRODUCT_SET_STAMPA_POS, PRODUCT_SET_STAMPA_COLOR, PRODUCT_SET_STAMPA, PRODUCT_SET_ACTIVE, PRODUCT_SET_TEXTURE, PRODUCT_CLEAR_CUSTOM_IMAGE, PRODUCT_APPLY_CUSTOM_IMAGE, PRODUCT_SET_COLOR, productActionTypes, productState, PRODUCT_ADD_MODEL_DATA, PRODUCT_SET_CUSTOM_IMAGE } from './types';
import {shapeSectionData, shapeTextureData} from '../../utils';
import {productPartType} from './types';
import pathConfig from '../../config/pathConfig';

const initialState: productState = {
  loadingMeshParts: true,
  loadingModelData: true,
  loadingMaterials: true,
  meshParts: [],
  materials: [],
  sections: [],
  src: '',
  customImage: '',
  stampa: {
    1: '',
    2: ''
  },
  stampaColor: '#111111',
  stampaPos: '1',
  stampaStyle: 'printed',
  cartVariationIds: {},
  cartPayload: []
};

const _updateCart = (state: productState, materials: any) => {

  /**
   * Step One: Get product IDs for each section
   */
  const stepOne: any[] = [];

  state.sections.forEach(section => {
    materials.forEach((material: any) => {
      if (material.uid === section.current_material.uid && material.wooProduct)
        stepOne.push({tag: section.tag, pid: material.wooProduct.id});
    });
  });

  /**
   * Step Two: Add variation IDs
   */

  const stepTwo = stepOne.map(li => {
    const variations = state.cartVariationIds && state.cartVariationIds[li.pid];
    const sectionVariation = variations && variations.filter(varia => varia.tag === li.tag);
    if (!sectionVariation)
      return li;
    return {
      ...li,
      vid: sectionVariation[0].id,
      vslug: sectionVariation[0].slug,
      qty: 1,
      color: "Default"
    }
  });

  const lineItems = [
    {
    pid: 42,
    qty: 1,
    tag: "base",
    vid: null
  },
...stepTwo];

const endpointPayload: any = {
  action: 'add_custom_to_cart',
  items: JSON.stringify(lineItems)
}

const fd = new FormData();

for (var key in endpointPayload) {
  fd.append(key, endpointPayload[key])
}

fetch(pathConfig.endpoints.cart, {
  method: 'POST',
  body: fd
})
.catch(err => console.warn('There was an error updating the cart (check reducer)', err));

  return lineItems;
}

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
        newSec.locked = part.locked;
        return newSec;
      });

      const meshParts = action.payload.map((part: any, idx: number) => {
        if (idx !== 0)
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

        /**
         * If the current color doesn't exist in the new material, change the color to the first in swatches of new material
         */
        const canKeepCurrentColor = newMaterial.swatches.filter(swatch => swatch.swatch.toLowerCase() === ns.color.toLowerCase()).length !== 0;
        if (!canKeepCurrentColor)
          ns.color = newMaterial.swatches[0].swatch;

        return ns;
      });

      const updatedCartData = _updateCart({...state, sections: newActiveSections}, state.materials);

      return {
        ...state,
        sections: newActiveSections,
        cartPayload: updatedCartData
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
      
      const cartData = _updateCart({...state}, action.payload);

      return {
        ...state,
        loadingMaterials: false,
        materials: [...state.materials, ...action.payload],
        cartPayload: cartData
        // add new state here
      };

    case PRODUCT_ADD_CART_VARIATION_IDS:
      return {
        ...state,
        cartVariationIds: action.payload
      }

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

    case PRODUCT_SET_CUSTOM_IMAGE:
      return {
        ...state,
        customImage: action.payload
      }

    case PRODUCT_APPLY_CUSTOM_IMAGE:
      // Get active section
      const [activeSection] = state.sections.filter(section => section.active);
      const rest = state.sections.filter(section => !section.active);
      const newActive = {
       ...activeSection,
       custom_texture: action.payload
      }
      return {
        ...state,
        sections: [newActive, ...rest]
      }

    case PRODUCT_CLEAR_CUSTOM_IMAGE:
      return {
        ...state,
        customImage: ''
      }

    case PRODUCT_SET_STAMPA:
      const newStampas = {...state.stampa};
      newStampas[action.payload.pos] = newStampas[action.payload.pos] === action.payload.letter ? '' : action.payload.letter;
      return {
        ...state,
        stampa: newStampas
      }
    case PRODUCT_SET_STAMPA_COLOR:
      
      return {
        ...state,
        stampaColor: action.payload
      }
    case PRODUCT_SET_STAMPA_POS:
      return {
        ...state,
        stampaPos: action.payload
      }
      case PRODUCT_SET_STAMPA_STYLE:
        const [stampaMat] = state.materials.filter(mat => mat.uid === -2); 
        const restMats = state.materials.filter(mat => mat.uid !== -2); 
        const newStampaMat = {...stampaMat};
        newStampaMat.maps = action.payload === 'stitched' ? ['alpha', 'ao', 'normal'] : ['alpha'];
        const newMats = [...restMats, newStampaMat];
        return {
          ...state,
          materials: newMats,
          stampaStyle: action.payload
        }
    default:
      return state;
  }
}
