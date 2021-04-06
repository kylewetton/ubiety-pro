import styled from 'styled-components';
import { CheckmarkProps } from '../types';
import {colors, spacing} from '../../../theme';

export const CheckmarkDiv = styled.div<CheckmarkProps>`
    position: absolute;
    top: 0;
    right: 0;
    height: ${spacing[6]};
    width: ${spacing[6]};
    background-color: ${colors.brand.mint};
    display: flex;
    justify-content: center;
    align-items: center; 
    z-index: 2;
    svg, path {
        fill: ${colors.white};
    }
    `