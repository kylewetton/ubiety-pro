import styled from 'styled-components';
import { StageSelectorSidebarProps } from '../types';
import {colors, radius, spacing} from '../../../theme';

export const StageSelectorSidebarDiv = styled.div<StageSelectorSidebarProps>`
    position: fixed;
    right: 0;
    top: 0; bottom: 0;
    left: auto;
    height: 100%;
    width: 240px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-top: ${spacing[24]};
    justify-content: flex-start;
    z-index: 50;
`