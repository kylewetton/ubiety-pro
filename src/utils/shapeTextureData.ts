import {Texture} from '../store/product/types';

type ShapeTextureFn = (data: any, isMaskedShadow?: boolean) => Texture[];

const shapeTextureData: ShapeTextureFn = (data, isMaskedShadow) => {

    if (isMaskedShadow)
        return data.map((entry: any) => {
            return  {
                tag: entry.title,
                src: '/shadow',
                maps: ['alpha'],
                normalIntensity: 0,
                flipY: true,
                swatches: []
            }
        });
    
    return data.map((entry: any) => {
        return  {
            tag: entry.slug,
            src: `/${entry.acf.texture_file.title}`,
            maps: entry.acf.texture_maps_included,
            normalIntensity: +entry.acf.material_attributes.normal_intensity,
            flipY: false,
            swatches: entry.acf.swatches,
            repeat: +entry.acf.material_attributes.repeat || 1
        }
    });
}

export default shapeTextureData;

