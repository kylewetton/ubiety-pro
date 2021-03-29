import React from 'react';
import { useDispatch } from 'react-redux';
import { productSetColorToActive } from '../../store/product/actions';
import Checkmark from '../Checkmark';
import {SwatchDiv, SwatchTextureOverlay} from './styles/SwatchStyles';
import { SwatchProps } from './types';

const Swatch: React.FC<SwatchProps> = ({color, active, thumbnail, label}) => {

    const dispatch = useDispatch();
    return (
        <SwatchDiv active={active} onClick={() => dispatch(productSetColorToActive(color))} color={color}>
            {active ? <Checkmark /> : null}
            {thumbnail && 
                <SwatchTextureOverlay src={thumbnail} />
            }
        </SwatchDiv>
    );
};

export default Swatch;