import {Texture} from '../store/product/types';

type ShapeTextureFn = (data: any, isMaskedShadow?: boolean) => Texture[];

const shapeTextureData: ShapeTextureFn = (data, isMaskedShadow) => {
    
    return data.map((entry: any) => {
        return  {
            tag: isMaskedShadow ? entry.title : entry.slug,
            src: isMaskedShadow ? '/shadow' : '/canvas', // entry.acf.texture_file.url.split('.zip')[0],
            maps: isMaskedShadow ? ['alpha'] : entry.acf.texture_maps_included,
            normalIntensity: isMaskedShadow ? 0 : +entry.acf.material_attributes.normal_intensity,
            flipY: isMaskedShadow,
            swatches: isMaskedShadow ? [] : entry.acf.swatches
        }
    });
}

export default shapeTextureData;

