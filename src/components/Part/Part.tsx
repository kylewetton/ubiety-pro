import React, {Suspense, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { PartProps } from './types';
import CustomMaterial from '../CustomMaterial';
import config from '../../config/brandConfig';
import { productSetActivePart, productSetColorToActive } from '../../store/product/actions';
import {interfaceUpdatePointer} from '../../store/interface/actions';
import {interfaceGetPointerPosition} from '../../store/interface/selectors';

const Part: React.FC<PartProps> = ({materialUid, color, mesh, locked, id}) => {


    const dispatch = useDispatch();
    // Disable stops the user from clicking on the item until the color has returned to default
    // This stops the user being able to lock in the hoverColor
    const [disabled, setDisabled] = useState(false);
    const {x: downX, y: downY} = useSelector(interfaceGetPointerPosition);

    const _handleSetActive = () => {
        setDisabled(true);
        dispatch(productSetActivePart(id));
        dispatch(productSetColorToActive(config.hoverColor));
        setTimeout(() => {
            dispatch(productSetColorToActive(color));
            setDisabled(false);
        }, 200);
    }
    const _handlePointerDown = (e: React.PointerEvent<Element>) => {
        const {clientX: x, clientY: y} = e;
        dispatch(interfaceUpdatePointer({x: Math.floor(x), y: Math.floor(y)}));
    }

    const _handlePointerUp = (e: React.PointerEvent<Element>) => {
        // This determines whether the user dragged or intended to click
        const {clientX: x, clientY: y} = e;
        if (Math.floor(x) === downX && Math.floor(y) === downY)
            _handleSetActive();
    }

    return (
        <Suspense fallback={
            (
            <mesh
            geometry={mesh.geometry}
            >
                <meshStandardMaterial color={'#ebebeb'} wireframe/>
            </mesh>
            )
        }>
            <mesh
                onPointerDown={(e) => !locked && !disabled && _handlePointerDown(e)}
                onPointerUp={(e) => !locked && !disabled && _handlePointerUp(e)}
                key={id} geometry={mesh.geometry} castShadow receiveShadow>
                    { materialUid && (
                        <CustomMaterial color={ color } uid={materialUid} />
                    ) }
            </mesh>
        </Suspense>
    );
};

export default Part;