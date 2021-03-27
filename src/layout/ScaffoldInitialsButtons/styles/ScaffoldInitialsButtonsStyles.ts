import styled from 'styled-components';
import { ScaffoldInitialsButtonsProps } from '../types';
import {colors, breakpoints, radius, spacing} from '../../../theme';

export const ScaffoldInitialsButtonsDiv = styled.div<ScaffoldInitialsButtonsProps>`
    display: flex;
    flex-direction: column;
    
    @media (min-width: ${breakpoints.lg}) {
        flex-direction: row;
    }

    article {
        display: flex;
        align-items: center;
        justify-content: stretch;
        margin-top: ${spacing[2]};
        @media (min-width: ${breakpoints.md}) {
            margin: 0 ${spacing[3]};
        }
        button {
            display: block;
            flex: 1 1 auto;
        }
        > div {
            flex: 2 0 auto;
           > div {
                transform: translate(0, calc(-100% - ${spacing[2]}));
                input {
                    background-color: ${colors.white} !important;
                }
            }
        }
        
    }
`