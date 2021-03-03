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
                        if (!part) return false;
                        const {materialTag, color, locked, id} = part;
                      return <Part key={id} id={id} locked={locked} mesh={mesh} materialTag={materialTag} color={color} />;
                    })
                }
                {
                    _map(file, (mesh: any) => {
                        const part = parts.filter(p => mesh.parent && mesh.parent.material !== null && p.id === mesh.parent.uuid);
                        return _map(part, p => {
                            const {materialTag, color, locked, id} = p;
                            return <Part key={id} id={id} locked={locked} mesh={mesh} materialTag={materialTag} color={color} />;
                            }
                        );
                    })
                }
            </group>
    );
};

export default Product;