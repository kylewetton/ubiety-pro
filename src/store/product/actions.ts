import { Mesh } from 'three';
import _map from 'lodash/map';
import { PRODUCT_ADD_MESHPARTS, PRODUCT_SET_ACTIVE, PRODUCT_SET_TEXTURE, PRODUCT_SET_COLOR, productActionTypes, productPartType, PRODUCT_ADD_MATERIALS, PRODUCT_ADD_MODEL_DATA } from './types';

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
            isControlledChild: part.parent !== null,
            locked: part.name.includes('|disable'),
            active: false,
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

