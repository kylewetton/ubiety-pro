import styled from 'styled-components';
import { StampaColorPickerProps } from '../types';
import {colors, radius, spacing} from '../../../theme';

export const StampaColorPickerDiv = styled.div<StampaColorPickerProps>`
    position: relative;
    display: flex;
    align-items: center;
`

export const StampaColorPickerPalette = styled.div<{active?: boolean}>`
    display: ${props => props.active ? 'block' : 'none'};
    position: absolute;
    top: 0;
    transform: translate(-10%, calc(-100% - ${spacing[3]}));
`