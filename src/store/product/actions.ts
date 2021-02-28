import { Mesh } from 'three';
import _map from 'lodash/map';
import { PRODUCT_ADD_PARTS, PRODUCT_SET_ACTIVE, PRODUCT_SET_TEXTURE, PRODUCT_SET_COLOR, productActionTypes, productPartType } from './types';
import config from '../../config/productConfig';

const parseName = (name: string) => {
    const label = name.split('|')[0];
    const readable = label.split('_');
    return readable.join(' ');
}

const parseTag = (name: string) => {
    return name.split('|')[0];
}

export function productAddParts(data: any): productActionTypes {

    const parts: productPartType[] = _map(data, (part: Mesh) => {

        /**
        * @TODO Figure out materials type here, Material should have uuid?
        */
        const materialId: string = (part as any).hasOwnProperty('material') ? (part as any).material.uuid : 'na';

        return {
            id: part.uuid,
            tag: parseTag(part.name),
            name: parseName(part.name),
            parent: part.parent ? part.parent.name : null,
            material: materialId,
            locked: part.name.includes('|disable'),
            active: false,
            textureFolder: config.initialTextures[parseTag(part.name)] && config.initialTextures[parseTag(part.name)]['folder'],
            color: config.initialTextures[parseTag(part.name)] && config.initialTextures[parseTag(part.name)].color ? config.initialTextures[parseTag(part.name)].color : '#FFFFFF',
        } as productPartType
    })

    return {
        type: PRODUCT_ADD_PARTS,
        payload: parts
    }
}

export function productSetActivePart(id: string) {
    return {
        type: PRODUCT_SET_ACTIVE,
        payload: id
    }
}

export function productSetTextureToActive(folder: string) {
    return {
        type: PRODUCT_SET_TEXTURE,
        payload: folder
    }
}

export function productSetColorToActive(hex: string) {
    return {
        type: PRODUCT_SET_COLOR,
        payload: hex
    }
}