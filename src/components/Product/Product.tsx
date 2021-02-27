import React from 'react';
import { ProductProps } from './types';
import {useModel} from '../../hooks';

/**
 * 
 * @param file – URL to glb file 
 */

const Product: React.FC<ProductProps> = ({file, rotation = [0, 0, 0]}) => {

    const [geometries, center] = useModel(file);

    return (
    <group rotation={rotation}>
        {geometries.map((geom: any) => (
            <mesh key={geom.uuid} position={center} geometry={geom} castShadow receiveShadow>
                <meshPhysicalMaterial color={'orange'} />
            </mesh>
        ))}
    </group>
    );
};

export default Product;