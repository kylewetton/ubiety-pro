import React from 'react';
import { useDispatch } from 'react-redux';
import { productSetColorToActive } from '../../store/product/actions';
import Checkmark from '../Checkmark';
import {SwatchDiv} from './styles/SwatchStyles';
import { SwatchProps } from './types';

const Swatch: React.FC<SwatchProps> = ({color, active, label}) => {

    const dispatch = useDispatch();
    return (
        <SwatchDiv active={active} onClick={() => dispatch(productSetColorToActive(color))} color={color}>
            {active ? <Checkmark /> : null}
        </SwatchDiv>
    );
};

export default Swatch;