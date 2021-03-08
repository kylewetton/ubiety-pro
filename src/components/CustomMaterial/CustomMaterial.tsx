import React from 'react';
import {useCubeTexture} from 'drei';
import { CustomMaterialProps } from './types';
import {useTexture} from 'drei';
import { Vector2, RepeatWrapping, Texture } from 'three';
import _map from 'lodash/map';
import { useSelector } from 'react-redux';
import { getMaterialByUid } from '../../store/product/selectors';


/**
 * 
 * @param uid – the material uid
 */

const CustomMaterial: React.FC<CustomMaterialProps> = ({uid, color}) => {
    
    const material = useSelector(getMaterialByUid(uid));
    const envMap = useCubeTexture(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'], { path: '/cubemap/medium-studio/' })

    const maps = material && material.maps;
    // Convert to texture image paths
    const paths = maps.map(texture => `${material.src}/${texture}.jpg`);
    // Load all the textures (useTexture returns an array)
    let texture: Texture[] | null = useTexture(paths);

    // Convert texture array to an object where the key === the index position of the map array
    let textureObj = Object.assign({}, texture);

    // Flip the textures if needed 
    if (material.flipY)
      _map(textureObj, txt => {txt.flipY = false});

    // Set more texture values
    _map(textureObj, txt => {
        material.repeat && txt.repeat.set(material.repeat, material.repeat);
        txt.wrapS = RepeatWrapping;
        txt.wrapT = RepeatWrapping;
        return txt;
    });

    const _getTexture = () => (
        <meshStandardMaterial
            attach="material"
            color={color}
            map={maps.includes('color') ? textureObj[maps.indexOf('color')] : null}
            aoMap={maps.includes('ao') ? textureObj[maps.indexOf('ao')] : null}
            roughnessMap={maps.includes('roughness') ? textureObj[maps.indexOf('roughness')] : null}
            alphaMap={maps.includes('alpha') ? textureObj[maps.indexOf('alpha')] : null}
            normalMap={maps.includes('normal') ? textureObj[maps.indexOf('normal')] : null}
            normalScale={new Vector2(material.normalIntensity, material.normalIntensity)}
            transparent={true}
        />);

    /**
     * @TODO Ground shadow
     */
    const _getGroundShadow = () => (
        <meshPhongMaterial
            attach="material"
            color={color}
            map={(maps.includes('color') ? textureObj[maps.indexOf('color')] : null)}
            aoMap={maps.includes('ao') ? textureObj[maps.indexOf('ao')] : null}
            alphaMap={maps.includes('alpha') ? textureObj[maps.indexOf('alpha')] : null}
            normalMap={maps.includes('normal') ? textureObj[maps.indexOf('normal')] : null}
            normalScale={new Vector2(material.normalIntensity, material.normalIntensity)}
            transparent={true}
            shininess={0}
        />
    );

    const _getNonTexturedMaterial = () => (
        <meshPhysicalMaterial
            attach="material"
            color={color}
            metalness={material.metallic ? 1 : 0}
            roughness={0}
            envMap={envMap}
        />
    );

    switch(true) {
        case(maps.includes('alpha')) :
            return _getGroundShadow();
        case(maps.length === 0) :
            return _getNonTexturedMaterial();
        default :
            return _getTexture();
    }

};

export default CustomMaterial;