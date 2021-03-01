import React from 'react';
import _map from 'lodash/map';
import {useSelector} from 'react-redux';
import worldConfig from '../../config/worldConfig';
import { ProductProps } from './types';
import { getAllProductParts } from '../../store/product/selectors';
import Part from '../Part';

/**
 * 
 * @param file – [geometries, center] 
 */

const Product: React.FC<ProductProps> = ({file, rotation = [0, 0, 0]}) => {

    const parts = useSelector(getAllProductParts);

    return (        
            <group position={worldConfig.worldOffset} rotation={rotation}>
                {
                    _map(file, (mesh: any) => {
                        const part = parts.filter(p => p.id === mesh.uuid)[0];
                        const {textureFolder, color, locked, id} = part;
                        return <Part key={id} id={id} locked={locked} mesh={mesh} folder={textureFolder} color={color} />;
                    })
                }
            </group>
    );
};

export default Product;