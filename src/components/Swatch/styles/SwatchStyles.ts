import styled from 'styled-components';
import { SwatchProps } from '../types';

export const SwatchDiv = styled.div<SwatchProps>`
    height: 64px;
    width: 64px;
    background-color: ${props => props.color};
    cursor: pointer;
    &:hover {
        transition: transform 0.1s ease-out;
        transform: scale(1.1);
        z-index: 15;
    }
`