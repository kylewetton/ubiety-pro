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

    console.log('xx Product meshParts', meshParts);

    return (        
            <group position={worldConfig.worldOffset} rotation={rotation}>
                {
                    _map(file, (mesh: any) => {
                        const part = meshParts.filter(p => p.id === mesh.uuid)[0];
                        if (!part) return false;
                        const {materialUid, color, locked, id} = part;
                        console.log('xx', sections.filter(section => section.tag === part.tag));

                      return <Part key={id} id={id} locked={locked} mesh={mesh} materialUid={materialUid} color={color} />;
                    })
                }
                {
                    _map(file, (mesh: any) => {
                        const part = meshParts.filter(p => mesh.parent && mesh.parent.material !== null && p.id === mesh.parent.uuid);
                        return _map(part, p => {
                            const {materialUid, color, locked, id} = p;
                            return <Part key={id} id={id} locked={locked} mesh={mesh} materialUid={materialUid} color={color} />;
                            }
                        );
                    })
                }
            </group>
    );
};

export default Product;