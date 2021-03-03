import React, {Suspense, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import { PartProps } from './types';
import CustomMaterial from '../CustomMaterial';
import config from '../../config/brandConfig';
import { productSetActivePart, productSetColorToActive } from '../../store/product/actions';

const Part: React.FC<PartProps> = ({materialTag, color, mesh, locked, id}) => {

    const dispatch = useDispatch();
    const [rayDownPoint, setRayDownPoint] = useState({x: 0, y: 0});
    
    // Disable stops the user from clicking on the item until the color has returned to default
    // This stops the user being able to lock in the hoverColor
    const [disabled, setDisabled] = useState(false);

    const _handleSetActive = () => {
        dispatch(productSetActivePart(id));
        dispatch(productSetColorToActive(config.hoverColor));
        setTimeout(() => {
            dispatch(productSetColorToActive(color));
            setDisabled(false);
        }, 200);
    }
    const _handlePointerDown = (e: React.PointerEvent<Element>) => {
        const {clientX: x, clientY: y} = e;
        setRayDownPoint({x: Math.floor(x), y: Math.floor(y)});
    }

    const _handlePointerUp = (e: React.PointerEvent<Element>) => {
        const {clientX: x, clientY: y} = e;
        const {x: downX, y: downY} = rayDownPoint;
        console.log('xx', Math.floor(x), Math.floor(y), '|', downX, downY)

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
                onPointerDown={(e) => !locked && !disabled && _handlePointerDown(e)}
                onPointerUp={(e) => !locked && !disabled && _handlePointerUp(e)}
                key={mesh.uuid} geometry={mesh.geometry} castShadow receiveShadow>
                    { materialTag && (
                        <CustomMaterial color={ color } tag={materialTag} />
                    ) }
            </mesh>
        </Suspense>
    );
};

export default Part;