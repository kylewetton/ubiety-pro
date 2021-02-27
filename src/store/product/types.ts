export interface productPartType {
    id: string;
    name: string;
    parent: string;
    material: string;
    locked: boolean;
}

export type productState = {
    parts: productPartType[];
};

// action

export const PRODUCT_ADD_PARTS = 'PRODUCT_ADD_PARTS';

interface productAddParts {
    type: typeof PRODUCT_ADD_PARTS,
    payload: any
}

export type productActionTypes = productAddParts;
