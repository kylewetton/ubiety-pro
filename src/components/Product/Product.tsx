import React from 'react';
import _map from 'lodash/map';
import _filter from 'lodash/filter';
import { useSelector} from 'react-redux';
import worldConfig from '../../config/worldConfig';
import { ProductProps } from './types';
import { getAllProductMeshParts, getAllSections, getMaterialByTag } from '../../store/product/selectors';
import Part from '../Part';

const Product: React.FC<ProductProps> = ({file, rotation = [0, 0, 0]}) => {

    const meshParts = useSelector(getAllProductMeshParts);
    const sections = useSelector(getAllSections);
    const shadowMaterial = useSelector(getMaterialByTag('shadow'));

    return (        
            <group position={worldConfig.worldOffset} rotation={rotation}>
                {
                    /**
                     * Add top level mesh parts
                     */
                    _map(file, (mesh: any) => {
                        const [part] = meshParts.filter(meshPart => meshPart.id === mesh.uuid);
                        const [section] = sections.filter(s => s.meshPart === mesh.uuid);
                        if (!part || !section) return null;
                        const {locked, id} = part;
                        const {current_material, color} = section;
                        return <Part key={id} id={id} locked={locked} mesh={mesh} materialUid={current_material.uid} color={color} />;
                    })
                }
                {
                    /**
                     * Add children of top level mesh parts
                     */
                    _map(file, (mesh: any) => {
                       return mesh.children.map((child: any) => {
                            const [part] = meshParts.filter(meshPart => meshPart.id === child.parent.uuid);
                            const [section] = sections.filter(s => s.meshPart === child.parent.uuid);
                            if (!part || !section) return null;
                            const {locked, id} = part;
                            const {current_material, color} = section;
                            return <Part key={id} id={id} locked={locked} mesh={child} materialUid={current_material.uid} color={color} />;
                        });
                    })
                }
                {
                    /**
                     * Add the ground shadow
                     */
                    _map(meshParts, (part: any) => {
                        const {locked, id} = part;
                        const [shadowMesh] = _filter(file, (mesh: any) => mesh.name === 'shadow|disable');
                        if (part.tag !== 'shadow')
                            return null;
                        return <Part key={id} id={id} locked={locked} mesh={shadowMesh} materialUid={shadowMaterial.uid} color={'#000000'} />;
                    })
                }
            </group>
    );
};

export default Product;