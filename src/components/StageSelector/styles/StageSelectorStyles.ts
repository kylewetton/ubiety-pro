import styled from 'styled-components';
import { StageSelectorProps } from '../types';
import {breakpoints, colors, spacing} from '../../../theme';

export const StageSelectorDiv = styled.div<StageSelectorProps>`
    width: ${props => props.active ? '100%' : `calc(100% - ${spacing[10]})`};
    position: relative;
    transition: 150ms ease-out;
    margin-bottom: ${spacing[1]};
    opacity: ${props => props.active ? '1' : '0.66'};
    @media (min-width: ${breakpoints.md}) {
        margin-bottom: ${spacing[3]};
    }
`

export const StageSelectorAccent = styled.div<{active: boolean}>`
    background-color: ${colors.white};
    height: 3px;
    width: ${props => props.active ? '30px' : '0px'};
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    z-index: 5;
    transition: 150ms 150ms ease-out;
`