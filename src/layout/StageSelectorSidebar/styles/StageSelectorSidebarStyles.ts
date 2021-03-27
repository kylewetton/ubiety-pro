import styled from 'styled-components';
import { StageSelectorSidebarProps } from '../types';
import {breakpoints, colors, radius, spacing} from '../../../theme';

export const StageSelectorSidebarDiv = styled.div<StageSelectorSidebarProps>`
    position: fixed;
    right: 0;
    top: 0; bottom: auto;
    left: auto;
    height: auto;
    display: flex;
    width: 200px;
    flex-direction: column;
    align-items: flex-end;
    margin-top: ${spacing[10]};
    justify-content: flex-start;
    z-index: 50;
    
    @media (min-width: ${breakpoints.md}) {
        width: 240px;
        margin-top: ${spacing[24]};
    }
`