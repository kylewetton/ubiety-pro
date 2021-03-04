import React from 'react';
import { useDispatch } from 'react-redux';
import { productSetColorToActive } from '../../store/product/actions';
import {SwatchDiv} from './styles/SwatchStyles';
import { SwatchProps } from './types';

const Swatch: React.FC<SwatchProps> = ({color, label}) => {

    const dispatch = useDispatch();
    return (
        <SwatchDiv onClick={() => dispatch(productSetColorToActive(color))} color={color} />
    );
};

export default Swatch;