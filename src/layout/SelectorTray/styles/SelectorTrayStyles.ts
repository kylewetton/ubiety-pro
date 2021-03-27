import styled from 'styled-components';
import { SelectorTrayProps } from '../types';
import {breakpoints, spacing} from '../../../theme';

export const SelectorTrayDiv = styled.div<SelectorTrayProps>`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: ${spacing[3]};

    @media (min-width: ${breakpoints.sm}) {
        flex-direction: row;
    }

    @media (min-width: ${breakpoints.md}) {
        align-items: center;
        padding: ${spacing[8]};
    }
    @media (min-width: ${breakpoints.lg}) {
        padding: ${spacing[12]};
    }
`