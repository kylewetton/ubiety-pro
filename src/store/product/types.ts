export interface productPartType {
    id: string;
    name: string;
    tag: string;
    parent: string;
    material: string;
    locked: boolean;
    active: boolean;
    textureFolder: string;
    color: string;
}

export type productState = {
    parts: productPartType[];
};

// action

export const PRODUCT_ADD_PARTS = 'PRODUCT_ADD_PARTS';
export const PRODUCT_SET_ACTIVE = 'PRODUCT_SET_ACTIVE';
export const PRODUCT_SET_TEXTURE = 'PRODUCT_SET_TEXTURE';
export const PRODUCT_SET_COLOR = 'PRODUCT_SET_COLOR';

interface productAddParts {
    type: typeof PRODUCT_ADD_PARTS
    | typeof PRODUCT_SET_ACTIVE
    | typeof PRODUCT_SET_TEXTURE
    | typeof PRODUCT_SET_COLOR,
    payload: any
}

export type productActionTypes = productAddParts;
