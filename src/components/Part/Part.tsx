import React, {Suspense, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import { PartProps } from './types';
import CustomMaterial from '../CustomMaterial';
import config from '../../config/brandConfig';
import { productSetActivePart, productSetColorToActive } from '../../store/product/actions';

const Part: React.FC<PartProps> = ({folder, color, mesh, locked, id}) => {

    const dispatch = useDispatch();
    const [rayPoint, setRayPoint] = useState({x: 0, y: 0});

    const _handleSetActive = () => {
        dispatch(productSetActivePart(id));
        dispatch(productSetColorToActive(config.hoverColor));
        setTimeout(() => dispatch(productSetColorToActive(color)), 200);
    }
    const _handlePointerDown = (e: React.PointerEvent<Element>) => {
        setRayPoint({x: e.clientX, y: e.clientY})
    }

    const _handlePointerUp = (e: React.PointerEvent<Element>) => {
        setRayPoint(prev => {
            const {x: px, y: py} = prev;
            if (px !== e.clientX || py !== e.clientY)
                return {x: e.clientX, y: e.clientY}
            _handleSetActive();
            return {x: e.clientX, y: e.clientY}
        });
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
                onPointerDown={(e) => !locked && _handlePointerDown(e)}
                onPointerUp={(e) => !locked && _handlePointerUp(e)}
                key={mesh.uuid} geometry={mesh.geometry} castShadow receiveShadow>
                    { folder && (
                        <CustomMaterial color={ color } folder={folder} />
                    ) }
            </mesh>
        </Suspense>
    );
};

export default Part;