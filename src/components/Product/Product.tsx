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
                        const [part] = meshParts.filter(meshPart => meshPart.id === mesh.uuid);
                        const [section] = sections.filter(s => s.meshPart === mesh.uuid);
                        if (!part || !section) return false;
                        const {locked, id} = part;
                        const {current_material, color} = section;
                        return <Part key={id} id={id} locked={locked} mesh={mesh} materialUid={current_material.uid} color={color} />;
                    })
                }
                {
                    _map(file, (mesh: any) => {
                       return mesh.children.map((child: any) => {
                            const [part] = meshParts.filter(meshPart => meshPart.id === child.parent.uuid);
                            const [section] = sections.filter(s => s.meshPart === child.parent.uuid);
                            if (!part || !section) return false;
                            const {locked, id} = part;
                            const {current_material, color} = section;
                            return <Part key={id} id={id} locked={locked} mesh={child} materialUid={current_material.uid} color={color} />;
                        });
                    })
                }
            </group>
    );
};

export default Product;