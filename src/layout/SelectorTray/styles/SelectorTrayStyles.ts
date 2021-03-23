import styled from 'styled-components';
import { SelectorTrayProps } from '../types';
import {spacing} from '../../../theme';

export const SelectorTrayDiv = styled.div<SelectorTrayProps>`
    padding: ${spacing[12]};
`