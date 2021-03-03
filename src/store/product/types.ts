

 // action

export const PRODUCT_ADD_PARTS = 'PRODUCT_ADD_PARTS';
export const PRODUCT_SET_ACTIVE = 'PRODUCT_SET_ACTIVE';
export const PRODUCT_SET_TEXTURE = 'PRODUCT_SET_TEXTURE';
export const PRODUCT_SET_COLOR = 'PRODUCT_SET_COLOR';
export const PRODUCT_ADD_MATERIALS = 'PRODUCT_ADD_MATERIALS';
export const PRODUCT_ADD_MODEL_DATA = 'PRODUCT_ADD_MODEL_DATA';

interface productAction {
    type: typeof PRODUCT_ADD_PARTS
    | typeof PRODUCT_SET_ACTIVE
    | typeof PRODUCT_SET_TEXTURE
    | typeof PRODUCT_SET_COLOR
    | typeof PRODUCT_ADD_MATERIALS
    | typeof PRODUCT_ADD_MODEL_DATA,
    payload: any
}

export interface productPartType {
    id: string;
    name: string;
    tag: string;
    parent: string;
    material: string;
    locked: boolean;
    isControlledChild: boolean;
    active: boolean;
    materialTag: string;
    color: string;
    children: string[]
}

type Map = 'color' | 'ao' | 'roughness' | 'normal' | 'alpha';

export interface Texture {
    tag: string;
    src: string;
    maps: Map[];
    normalIntensity?: number,
    flipY?: boolean
}

export type productActionTypes = productAction;

export type productState = {
    parts: productPartType[];
    materials: Texture[];
    src: string;
};