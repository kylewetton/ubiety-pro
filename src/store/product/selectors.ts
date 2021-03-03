import { RootState } from '../index';

export const getAllProductParts = (state: RootState) => state.product.parts;

export const getActiveProductPart = (state: RootState) => {
    const active = state.product.parts.filter(part => part.active)[0];
    return active;
}

export const getAllMaterials = (state: RootState) => state.product.materials;

export const getProductModelPath = (state: RootState) => state.product.src;