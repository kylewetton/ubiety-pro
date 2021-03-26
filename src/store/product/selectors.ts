import { RootState } from '../index';

export const getIsLoading = (state: RootState) => state.product.loadingMeshParts && state.product.loadingMaterials && state.product.loadingModelData;

export const getAllProductMeshParts = (state: RootState) => state.product.meshParts;

export const getActiveProductPart = (state: RootState) => {
    const active = state.product.sections.filter(section => section.active)[0];
    return active;
}

export const getAllMaterials = (state: RootState) => state.product.materials;
export const getAllSections = (state: RootState) => state.product.sections;
export const getActiveSection = (state: RootState) => state.product.sections.filter(section => section.active);
export const getProductModelPath = (state: RootState) => state.product.src;
export const getMaterialByUid = (uid: number | null) => (state: RootState) => state.product.materials.filter(material => material.uid === uid)[0];
export const getMaterialByTag = (tag: string | null) => (state: RootState) => state.product.materials.filter(material => material.tag === tag)[0];
export const getProductDataByType = (type: string) => (state: RootState) => state.product[type];
export const getProductCustomImage = (state: RootState) => state.product.customImage;
export const getProductStampas = (state: RootState) => state.product.stampa;
export const getProductStampaColor = (state: RootState) => state.product.stampaColor;
export const getProductStampaPos = (state: RootState) => state.product.stampaPos;
export const getProductStampaStyle = (state: RootState) => state.product.stampaStyle;