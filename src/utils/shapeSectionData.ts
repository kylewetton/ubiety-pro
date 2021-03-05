import {Section} from '../store/product/types';

type ShapeSectionDataFn = (data: any) => Section[];

const shapeSectionData: ShapeSectionDataFn = (data: any) => {
    return data.map((section: any) => {
        return  {
            tag: section.model_tag,
            label: section.name,
            available_materials: section.available_textures ? section.available_textures.map((at: any) => {
                return {uid: at.ID, tag: at.post_name}
            }) : [],
            initial_texture: section.initial_texture.map((it: any) => {
                return {uid: it.ID, tag: it.post_name}
            })
        }
    });
}

export default shapeSectionData;
