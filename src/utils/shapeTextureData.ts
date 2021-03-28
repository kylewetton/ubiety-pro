import {Texture} from '../store/product/types';

type ShapeTextureFn = (data: any, isMaskedShadow?: boolean) => Texture[];

const PRODUCT_ID = process.env.NODE_ENV === 'development' || window.location.host.includes('netlify') ? '51' : document.getElementById('post_id')?.dataset.id;

const shapeTextureData: ShapeTextureFn = (data, isMaskedShadow) => {

    if (isMaskedShadow)
        return data.map((entry: any) => {
            return  {
                uid: -1,
                tag: entry.title,
                src: `/${PRODUCT_ID}`,
                maps: ['alpha'],
                normalIntensity: 0,
                flipY: true,
                swatches: [],
                metallic: false,
                roughness: 0
            }
        });

    
    return data.map((entry: any) => {
        const wooProduct = entry.acf?.product[0];
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
            metallic: entry.acf.material_attributes.metallic,
            wooProduct: wooProduct && {id: wooProduct.ID, tag: wooProduct.post_name, label: wooProduct.post_title}
        }
    });
}

export default shapeTextureData;

