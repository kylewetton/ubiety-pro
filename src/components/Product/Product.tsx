import React from 'react';
import _map from 'lodash/map';
import {useSelector} from 'react-redux';
import { ProductProps } from './types';
import { getAllProductParts } from '../../store/product/selectors';
import CustomMaterial from '../CustomMaterial';

/**
 * 
 * @param file – [geometries, center] 
 */

const Product: React.FC<ProductProps> = ({file, rotation = [0, 0, 0]}) => {

    const parts = useSelector(getAllProductParts);


    return (        
            <group rotation={rotation}>
                {
                    _map(file, (mesh: any) => {
                    const part = parts.filter(p => p.id === mesh.uuid)[0];
                    const {textureFolder, color} = part;

                    return (
                        <mesh key={mesh.uuid} geometry={mesh.geometry} castShadow receiveShadow>
                            { textureFolder && (
                            
                                <CustomMaterial color={color} folder={textureFolder} />
                            
                            ) }
                        </mesh>);
                    })
                }
            </group>
    );
};

export default Product;