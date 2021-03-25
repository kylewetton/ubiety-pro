import styled from 'styled-components';
import { LoadingOverlayProps } from '../types';
import {colors, radius, spacing} from '../../../theme';

export const LoadingOverlayDiv = styled.div`
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    z-index: 10999999999;
    background: ${colors.brand.offwhite};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p {
        margin-top: ${spacing[10]};
        font-weight: bold;
        text-color: ${colors.brand.blue};
    }

`