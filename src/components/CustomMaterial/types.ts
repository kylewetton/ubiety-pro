type Map = 'color' | 'ao' | 'roughness' | 'normal' | 'alpha';

export interface CustomMaterialProps {
    folder: string,
    color: string,
    maps?: Map[] 
}