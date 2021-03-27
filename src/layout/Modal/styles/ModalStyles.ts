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
    overflow-y: auto;
    &.hidden {
        display: none;
    }

    > div {
        transform: scale(0.66);
        @media (min-width: 414px) {
            transform: scale(0.75);
        }
        @media (min-width: 460px) {
            transform: scale(0.85);
        }
        @media (min-width: 520px) {
            transform: scale(1);
        }
    }
`

export const ModalInnerDiv = styled.div`

`