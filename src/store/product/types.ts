

 // action

export const PRODUCT_ADD_MESHPARTS = 'PRODUCT_ADD_MESHPARTS';
export const PRODUCT_SET_ACTIVE = 'PRODUCT_SET_ACTIVE';
export const PRODUCT_SET_TEXTURE = 'PRODUCT_SET_TEXTURE';
export const PRODUCT_SET_COLOR = 'PRODUCT_SET_COLOR';
export const PRODUCT_ADD_MATERIALS = 'PRODUCT_ADD_MATERIALS';
export const PRODUCT_ADD_MODEL_DATA = 'PRODUCT_ADD_MODEL_DATA';
export const PRODUCT_SET_CUSTOM_IMAGE = 'PRODUCT_SET_CUSTOM_IMAGE';
export const PRODUCT_APPLY_CUSTOM_IMAGE = 'PRODUCT_APPLY_CUSTOM_IMAGE';
export const PRODUCT_CLEAR_CUSTOM_IMAGE = 'PRODUCT_CLEAR_CUSTOM_IMAGE';
export const PRODUCT_DESTROY_ACTIVE_CUSTOM_IMAGE = 'PRODUCT_DESTROY_ACTIVE_CUSTOM_IMAGE';
export const PRODUCT_SET_TEXTURE_TO_TAG = 'PRODUCT_SET_TEXTURE_TO_TAG';
export const PRODUCT_SET_STAMPA = 'PRODUCT_SET_STAMPA';
export const PRODUCT_SET_STAMPA_COLOR = 'PRODUCT_SET_STAMPA_COLOR';
export const PRODUCT_SET_STAMPA_POS = 'PRODUCT_SET_STAMPA_POS';
export const PRODUCT_SET_STAMPA_STYLE = 'PRODUCT_SET_STAMPA_STYLE';
export const PRODUCT_ADD_CART_VARIATION_IDS = 'PRODUCT_ADD_CART_VARIATION_IDS';
export const PRODUCT_TOGGLE_CUSTOM_IMAGE_POS = 'PRODUCT_TOGGLE_CUSTOM_IMAGE_POS';

interface productAction {
    type: typeof PRODUCT_ADD_MESHPARTS
    | typeof PRODUCT_SET_ACTIVE
    | typeof PRODUCT_SET_TEXTURE
    | typeof PRODUCT_SET_COLOR
    | typeof PRODUCT_ADD_MATERIALS
    | typeof PRODUCT_SET_CUSTOM_IMAGE
    | typeof PRODUCT_APPLY_CUSTOM_IMAGE
    | typeof PRODUCT_CLEAR_CUSTOM_IMAGE
    | typeof PRODUCT_TOGGLE_CUSTOM_IMAGE_POS
    | typeof PRODUCT_DESTROY_ACTIVE_CUSTOM_IMAGE
    | typeof PRODUCT_SET_TEXTURE_TO_TAG
    | typeof PRODUCT_SET_STAMPA
    | typeof PRODUCT_SET_STAMPA_COLOR
    | typeof PRODUCT_SET_STAMPA_POS
    | typeof PRODUCT_SET_STAMPA_STYLE
    | typeof PRODUCT_ADD_CART_VARIATION_IDS
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
    materialUid: number;
    color: string;
    children: string[]
}

type Map = 'color' | 'ao' | 'roughness' | 'normal' | 'alpha' | 'customTexture';

export interface SwatchData {
    label: string;
    swatch: string;
}

export interface Texture {
    uid: number;
    tag: string;
    label: string;
    src: string;
    maps: Map[];
    normalIntensity?: number,
    flipY?: boolean;
    swatches: SwatchData[];
    repeat?: number;
    metallic?: boolean;
    thumbnail?: string | null;
}

export type MaterialReference = {uid: number, tag: string, label: string};

export interface Section {
    tag: string;
    label: string;
    available_materials: MaterialReference[];
    initial_material: MaterialReference;
    current_material: MaterialReference;
    active: boolean;
    meshPart: string;
    color: string;
    custom_texture?: (string | null)[];
    locked: boolean;
    allowCustom: boolean;
    customStencil?: string;
}

export type productActionTypes = productAction;

interface CartVariation {
    id: number;
    tag: string;
    slug: string;
}

interface CartLineItem {
    pid: number;
    vid: number | null;
    tag: string;
    qty: number;
    vslug?: string;
}

export type productState = {
    [key: string]: any;
    loadingMeshParts: boolean;
    loadingMaterials: boolean;
    loadingModelData: boolean;
    meshParts: productPartType[];
    materials: Texture[];
    sections: Section[];
    src: string;
    customImagePos: 0 | 1;
    customImage: string;
    stampa: {[key: string] : string};
    stampaColor: string;
    stampaPos: '1' | '2';
    stampaStyle: 'printed' | 'stitched';
    cartVariationIds?: {[key: number] : CartVariation[]};
    cartPayload: CartLineItem[]
};