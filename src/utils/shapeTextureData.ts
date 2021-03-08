import {Texture} from '../store/product/types';

type ShapeTextureFn = (data: any, isMaskedShadow?: boolean) => Texture[];

const shapeTextureData: ShapeTextureFn = (data, isMaskedShadow) => {

    if (isMaskedShadow)
        return data.map((entry: any) => {
            return  {
                uid: -1,
                tag: entry.title,
                src: '/shadow',
                maps: ['alpha'],
                normalIntensity: 0,
                flipY: true,
                swatches: [],
                metallic: false,
                roughness: 0
            }
        });
    
    return data.map((entry: any) => {
        return  {
            uid: entry.id,
            tag: entry.slug,
            label: entry.title.rendered,
            src: entry.acf.texture_file ? `/${entry.acf.texture_file.title}` : null,
            maps: entry.acf.texture_maps_included,
            normalIntensity: +entry.acf.material_attributes.normal_intensity,
            flipY: false,
            swatches: entry.acf.swatches,
            repeat: +entry.acf.material_attributes.repeat || 1,
            metallic: entry.acf.material_attributes.metallic
        }
    });
}

export default shapeTextureData;

