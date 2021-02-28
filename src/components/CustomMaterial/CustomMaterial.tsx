import React from 'react';
import { CustomMaterialProps } from './types';
import {useTexture} from 'drei';

const CustomMaterial: React.FC<CustomMaterialProps> = ({folder, color}) => {
    const [map] = useTexture([`${folder}/color.jpg`])    

    return (
        <meshStandardMaterial
            map={map}
            color={color}
            // aoMap={ao}
            // roughnessMap={roughness}
            // normalMap={normal}
        />
    )
};

export default CustomMaterial;