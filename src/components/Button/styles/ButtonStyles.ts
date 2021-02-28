import styled from 'styled-components';
import {colors, radius, spacing} from '../../../theme';

interface ButtonDivProps {

}

export const ButtonEl = styled.button<ButtonDivProps>`
    padding: ${spacing[1]} ${spacing[3]};
    border-radius: ${radius.full};
    background: ${colors.green[400]};
    color: ${colors.green[100]};

    &.sticky {
        top: 1rem; left: 1rem;
        position: absolute;
        z-index: 999;
    }
`