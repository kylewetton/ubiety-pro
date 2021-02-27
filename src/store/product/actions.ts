import { Mesh } from 'three';
import _map from 'lodash/map';
import { PRODUCT_ADD_PARTS, productActionTypes, productPartType } from './types';

const parseName = (name: string) => {
    const label = name.split('|')[0];
    const readable = label.split('_');
    return readable.join(' ');
}

export function productAddParts(data: any): productActionTypes {

    const parts: productPartType[] = _map(data, (part: Mesh) => {

        /**
        * @TODO Figure out materials type here, Material should have uuid?
        */
        const materialId: string = (part as any).hasOwnProperty('material') ? (part as any).material.uuid : 'na';

        return {
            id: part.uuid,
            name: parseName(part.name),
            parent: part.parent ? part.parent.name : null,
            material: materialId,
            locked: part.name.includes('|disable')
        } as productPartType
    })

    return {
        type: PRODUCT_ADD_PARTS,
        payload: parts
    }
}