import React from 'react';
import _map from 'lodash/map';
import _filter from 'lodash/filter';
import { useSelector} from 'react-redux';
import worldConfig from '../../config/worldConfig';
import { ProductProps } from './types';
import { getAllProductMeshParts, getAllSections, getMaterialByTag, getProductStampaColor, getProductStampas } from '../../store/product/selectors';
import Part from '../Part';

const Product: React.FC<ProductProps> = ({file, rotation = [0, 0, 0]}) => {

    const meshParts = useSelector(getAllProductMeshParts);
    const sections = useSelector(getAllSections);
    const shadowMaterial = useSelector(getMaterialByTag('shadow'));
    const stampaMaterial = useSelector(getMaterialByTag('stampa'));
    const stampas = useSelector(getProductStampas);
    const stampaColor = useSelector(getProductStampaColor);

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
                        const {current_material, custom_texture, color} = section;
                        const [c_texture_1, c_texture_2] = custom_texture || []; 
                        
                        return <Part key={id} id={id} customTexture={c_texture_1} locked={locked} mesh={mesh} materialUid={current_material.uid} color={color} />;
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
                            const {current_material, custom_texture, color} = section;
                            const [c_texture_1, c_texture_2] = custom_texture || []; 
                            return <Part key={id} id={id} customTexture={c_texture_2 || c_texture_1} locked={locked} mesh={child} materialUid={current_material.uid} color={color} />;
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
                {
                    /**
                     * Add stampa parts
                     */
                    _map(file, (mesh: any) => {
                        const allowedParts = [];
                        if (stampas[1])
                            allowedParts.push('stampa_1');
                        if (stampas[2])
                            allowedParts.push('stampa_2')
                        const [part] = meshParts.filter(meshPart => meshPart.id === mesh.uuid);
                        if (!part) return null;
                        const {locked, id, tag} = part;
                        const custom_texture = '';
                        if (!allowedParts.includes(tag))
                            return null;
                        return <Part key={id} tag={tag} id={id} override={{
                            alpha: tag === 'stampa_1' ? `/alpha/stampa-${stampas[1]}` : `/alpha/stampa-${stampas[2]}`,
                        }} customTexture={custom_texture} locked={locked} mesh={mesh} materialUid={stampaMaterial.uid} color={stampaColor} />;
                    })
                }

            </group>
    );
};

export default Product;