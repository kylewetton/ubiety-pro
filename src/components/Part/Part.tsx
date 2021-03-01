import React, {Suspense} from 'react';
import {useDispatch} from 'react-redux';
import { PartProps } from './types';
import CustomMaterial from '../CustomMaterial';
import config from '../../config/brandConfig';
import { productSetActivePart, productSetColorToActive } from '../../store/product/actions';

const Part: React.FC<PartProps> = ({folder, color, mesh, locked, id}) => {

    const dispatch = useDispatch();

    const _handleSetActive = () => {
        dispatch(productSetActivePart(id));
        dispatch(productSetColorToActive(config.hoverColor));
        setTimeout(() => dispatch(productSetColorToActive(color)), 200);
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
                        <CustomMaterial color={ color } folder={folder} />
                    ) }
            </mesh>
        </Suspense>
    );
};

export default Part;