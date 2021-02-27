import {useState} from 'react';
import {TextureLoader} from 'three'; 
import { useLoader } from 'react-three-fiber';

type UseTextureProps = (
    folder: string,
    format?: string
) => JSX.Element;

const useTexture: UseTextureProps = (folder, format = 'jpg') => {

    /**
     * @TODO Use a different caching method?
     */
    const [materials, setMaterials] = useState<any>({});

    const _generateNewMaterial = () => {
        const color = useLoader(TextureLoader, `${folder}/color.${format}`);
        const ao = useLoader(TextureLoader, `${folder}/ao.${format}`);

        const mat = <meshPhysicalMaterial
            map={color || null}
            aoMap={ao || null}
        />;

        const newMats = {[folder]: mat, ...materials};

        setMaterials(newMats);
        return mat;
    }

    if (materials.hasOwnProperty(folder))
        return materials[folder];
    
    return _generateNewMaterial();
}

export default useTexture;