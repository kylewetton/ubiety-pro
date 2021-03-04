import { RootState } from '../index';

export const getIsLoading = (state: RootState) => state.product.loadingParts && state.product.loadingMaterials && state.product.loadingModelData;

export const getAllProductParts = (state: RootState) => state.product.parts;

export const getActiveProductPart = (state: RootState) => {
    const active = state.product.parts.filter(part => part.active)[0];
    return active;
}

export const getAllMaterials = (state: RootState) => state.product.materials;
export const getProductModelPath = (state: RootState) => state.product.src;
export const getMaterialByTag = (tag: string | null) => (state: RootState) => state.product.materials.filter(material => material.tag === tag)[0];