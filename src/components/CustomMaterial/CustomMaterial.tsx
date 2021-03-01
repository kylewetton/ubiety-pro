import React from 'react';
import { CustomMaterialProps } from './types';
import {useTexture} from 'drei';
import {textures} from '../../config/productConfig';
import { Vector2 } from 'three';
import _map from 'lodash/map';

const CustomMaterial: React.FC<CustomMaterialProps> = ({folder, color}) => {
    // Sort in alphabetical order

    const maps = textures[folder]['maps'];
    // Convert to texture image paths
    const paths = maps.map(texture => `${folder}/${texture}.jpg`);
    // Load all the textures (useTexture returns an array)
    const texture = useTexture(paths);
    // Convert texture array to an object where the key === the index position of the map array
    let textureObj = Object.assign({}, texture);

    // Flip the textures if needed 
    if (textures[folder]['flipY'])
      _map(textureObj, txt => {txt.flipY = false});


    if (maps.includes('alpha'))
        return (
            <meshPhongMaterial
                attach="material"
                color={color}
                map={maps.includes('color') ? textureObj[maps.indexOf('color')] : null}
                aoMap={maps.includes('ao') ? textureObj[maps.indexOf('ao')] : null}
                alphaMap={maps.includes('alpha') ? textureObj[maps.indexOf('alpha')] : null}
                normalMap={maps.includes('normal') ? textureObj[maps.indexOf('normal')] : null}
                normalScale={new Vector2(textures[folder]['normalIntensity'], textures[folder]['normalIntensity'])}
                transparent={true}
            />
        )

    return (
        <meshStandardMaterial
            attach="material"
            color={color}
            map={maps.includes('color') ? textureObj[maps.indexOf('color')] : null}
            aoMap={maps.includes('ao') ? textureObj[maps.indexOf('ao')] : null}
            roughnessMap={maps.includes('roughness') ? textureObj[maps.indexOf('roughness')] : null}
            alphaMap={maps.includes('alpha') ? textureObj[maps.indexOf('alpha')] : null}
            normalMap={maps.includes('normal') ? textureObj[maps.indexOf('normal')] : null}
            normalScale={new Vector2(textures[folder]['normalIntensity'], textures[folder]['normalIntensity'])}
            transparent={true}
        />
    )
};

export default CustomMaterial;