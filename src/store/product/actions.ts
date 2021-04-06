import { Mesh } from 'three';
import _map from 'lodash/map';
import { PRODUCT_ADD_MESHPARTS, PRODUCT_SET_STAMPA_COLOR, PRODUCT_DESTROY_ACTIVE_CUSTOM_IMAGE, PRODUCT_TOGGLE_CUSTOM_IMAGE_POS, PRODUCT_ADD_CART_VARIATION_IDS, PRODUCT_SET_STAMPA_POS, PRODUCT_SET_STAMPA_STYLE, PRODUCT_SET_ACTIVE, PRODUCT_SET_TEXTURE_TO_TAG, PRODUCT_SET_CUSTOM_IMAGE, PRODUCT_CLEAR_CUSTOM_IMAGE, PRODUCT_APPLY_CUSTOM_IMAGE, PRODUCT_SET_TEXTURE, PRODUCT_SET_COLOR, productActionTypes, productPartType, PRODUCT_ADD_MATERIALS, PRODUCT_ADD_MODEL_DATA, PRODUCT_SET_STAMPA } from './types';

/**
 * 
 * Helpers
 */
const parseName = (name: string) => {
    const label = name.split('|')[0];
    const readable = label.split('_');
    return readable.join(' ');
}

const parseTag = (name: string) => {
    return name.split('|')[0];
}

/**
 * 
 * MeshParts
 */

export function productAddMeshParts(data: any): productActionTypes {

    const { sceneId } = data;

    const meshParts: productPartType[] = _map(data.meshParts, (part: Mesh) => {
        return {
            id: part.uuid,
            tag: parseTag(part.name),
            name: parseName(part.name),
            parent: part.parent && part.parent.uuid !== sceneId ? part.parent.uuid : null,
            children: part.children.map(child => child.uuid),
            locked: part.name.includes('|disable'),
        } as productPartType
    })

    return {
        type: PRODUCT_ADD_MESHPARTS,
        payload: meshParts
    }
}

export function productSetActivePart(id: string) {
    return {
        type: PRODUCT_SET_ACTIVE,
        payload: id
    }
}

export function productSetTextureToActive(uid: string | number) {
    return {
        type: PRODUCT_SET_TEXTURE,
        payload: uid
    }
}

export function productSetTextureToSectionByTag(tag: string) {
    return {
        type: PRODUCT_SET_TEXTURE_TO_TAG,
        payload: tag
    }
}

export function productSetColorToActive(hex: string) {
    return {
        type: PRODUCT_SET_COLOR,
        payload: hex
    }
}

export function productAddMaterials(data: any): productActionTypes {
    return {
        type: PRODUCT_ADD_MATERIALS,
        payload: data
    }
}

export function productAddModelData(data: any): productActionTypes {
    return {
        type: PRODUCT_ADD_MODEL_DATA,
        payload: data
    }
}

export function productAddCartVariationIds(data: any): productActionTypes {
    return {
        type: PRODUCT_ADD_CART_VARIATION_IDS,
        payload: data
    }
}

export function productSetCustomImage(data: any): productActionTypes {
    return {
        type: PRODUCT_SET_CUSTOM_IMAGE,
        payload: data
    }
}

export function productClearCustomImage(): any {
    return {
        type: PRODUCT_CLEAR_CUSTOM_IMAGE
    }
}

export function productApplyCustomImage(data: string): productActionTypes {
    return {
        type: PRODUCT_APPLY_CUSTOM_IMAGE,
        payload: data
    }
}

export function destroyCustomTextureFromActive(): any {
    return {
        type: PRODUCT_DESTROY_ACTIVE_CUSTOM_IMAGE,
        payload: null
    }
}

export function productSetStampa(data: { pos: '1' | '2', letter: string }): productActionTypes {
    return {
        type: PRODUCT_SET_STAMPA,
        payload: data
    }
}

export function productSetStampaColor(data: string): productActionTypes {
    return {
        type: PRODUCT_SET_STAMPA_COLOR,
        payload: data
    }
}

export function productSetStampaPos(data: '1' | '2'): productActionTypes {
    return {
        type: PRODUCT_SET_STAMPA_POS,
        payload: data
    }
}

export function productSetStampaStyle(data: 'printed' | 'stitched'): productActionTypes {
    return {
        type: PRODUCT_SET_STAMPA_STYLE,
        payload: data
    }
}

export function productToggleCustomImagePos(data: 0 | 1): productActionTypes {
    return {
        type: PRODUCT_TOGGLE_CUSTOM_IMAGE_POS,
        payload: data
    }
}