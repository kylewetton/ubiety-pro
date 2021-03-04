import styled from 'styled-components';
import { SwatchTrayProps } from '../types';
import {spacing} from '../../../theme';

export const SwatchTrayDiv = styled.div<SwatchTrayProps>`
    padding: ${spacing[4]}px;
    position: fixed;
    bottom: 0; left: 0; right: 0;
    z-index: 10;
    display: flex;
`