import styled from 'styled-components';
import { ModalProps } from '../types';
import {colors, radius, spacing} from '../../../theme';

export const ModalDiv = styled.div<ModalProps>`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0; left: 0; right: 0; bottom: 0;
    backdrop-filter: blur(5px);
    z-index: 999999;
    &.hidden {
        display: none;
    }
`

export const ModalInnerDiv = styled.div`

`