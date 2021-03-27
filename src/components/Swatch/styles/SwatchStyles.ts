import styled from 'styled-components';
import { SwatchProps } from '../types';
import {breakpoints} from '../../../theme';

export const SwatchDiv = styled.div<SwatchProps>`
    position: relative;
    flex: 1 0 auto;
    height: 52px;
    width: 52px;
    background-color: ${props => props.color};
    cursor: pointer;
    &:hover {
        transition: transform 0.1s ease-out;
        transform: scale(1.1);
        z-index: 15;
    }
    @media (min-width: ${breakpoints.lg}) {
        height: 78px;
        width: 78px;
    }
`