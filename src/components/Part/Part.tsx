import React, {Suspense, useState} from 'react';
import {useDispatch} from 'react-redux';
import { PartProps } from './types';
import CustomMaterial from '../CustomMaterial';
import config from '../../config/brandConfig';
import { productSetActivePart } from '../../store/product/actions';

const Part: React.FC<PartProps> = ({folder, color, mesh, locked, id}) => {

    const dispatch = useDispatch();
    const [hovered, setHover] = useState(false);

    const _handleSetActive = () => {
        setHover(true);
        dispatch(productSetActivePart(id));
        setTimeout(() => setHover(false), 200);
    }

    return (
        <Suspense fallback={
            (
            <mesh
            geometry={mesh.geometry}
            >
                <meshStandardMaterial color={color} />
            </mesh>
            )
        }>
            <mesh
                onClick={(e) => !locked && _handleSetActive()}
                key={mesh.uuid} geometry={mesh.geometry} castShadow receiveShadow>
                    { folder && (
                        <CustomMaterial color={hovered ? config.hoverColor : color} folder={folder} />
                    ) }
            </mesh>
        </Suspense>
    );
};

export default Part;