import {Section} from '../store/product/types';

type ShapeSectionDataFn = (data: any) => Section[];

const shapeSectionData: ShapeSectionDataFn = (data: any) => {

    return data.map((section: any) => {
        const initial_material = section.initial_texture.map((it: any) => {
            return {uid: it.ID, tag: it.post_name}
        });
        return  {
            tag: section.model_tag,
            label: section.name,
            available_materials: section.available_textures ? section.available_textures.map((at: any) => {
                return {uid: at.ID, tag: at.post_name}
            }) : [],
            initial_material: initial_material.length ? initial_material[0] : null,
            current_material: initial_material.length ? initial_material[0] : null
        }
    });
}

export default shapeSectionData;
