import React from 'react';
import _map from 'lodash/map';
import { useSelector} from 'react-redux';
import worldConfig from '../../config/worldConfig';
import { ProductProps } from './types';
import { getAllProductMeshParts, getAllSections } from '../../store/product/selectors';
import Part from '../Part';

const Product: React.FC<ProductProps> = ({file, rotation = [0, 0, 0]}) => {

    const meshParts = useSelector(getAllProductMeshParts);
    const sections = useSelector(getAllSections);

    return (        
            <group position={worldConfig.worldOffset} rotation={rotation}>
                {
                    _map(file, (mesh: any) => {
                        const [part] = meshParts.filter(p => p.id === mesh.uuid);
                        const [section] = sections.filter(s => s.meshPart === mesh.uuid);
                        if (!part || !section) return false;
                        const {locked, id} = part;
                        const {current_material, color} = section;
                      return <Part key={id} id={id} locked={locked} mesh={mesh} materialUid={current_material.uid} color={color} />;
                    })
                }
                {/* {
                    _map(file, (mesh: any) => {
                        const part = meshParts.filter(p => mesh.parent && mesh.parent.material !== null && p.id === mesh.parent.uuid);
                        return _map(part, p => {
                            const {materialUid, color, locked, id} = p;
                            return <Part key={id} id={id} locked={locked} mesh={mesh} materialUid={materialUid} color={color} />;
                            }
                        );
                    })
                } */}
            </group>
    );
};

export default Product;