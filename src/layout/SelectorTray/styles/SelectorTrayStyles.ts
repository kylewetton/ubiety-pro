import styled from 'styled-components';
import { SelectorTrayProps } from '../types';
import {spacing} from '../../../theme';

export const SelectorTrayDiv = styled.div<SelectorTrayProps>`
    display: flex;
    align-items: center;
    padding: ${spacing[12]};
`