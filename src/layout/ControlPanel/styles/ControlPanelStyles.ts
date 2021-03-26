import styled from 'styled-components';
import { ControlPanelProps } from '../types';
// import {colors, radius, spacing} from '../../../theme';

export const ControlPanelDiv = styled.div<ControlPanelProps>`
    position: fixed;
    bottom: 0; left: 0; right: 0;
    z-index: 60;
`