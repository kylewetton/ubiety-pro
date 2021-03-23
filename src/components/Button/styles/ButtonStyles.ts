import styled from 'styled-components';
import {colors, spacing, textSize} from '../../../theme';

interface ButtonDivProps {

}

const _genButtonTheme = (color: string) => {
    switch (color) {
        case 'blue' :
            return colors.brand.blue;
        case 'mint' :
            return colors.brand.mint;
        case 'gray' :
            return colors.gray[500];
        case 'green' :
        default :
            return colors.brand.green;
    }
}

export const ButtonEl = styled.button<ButtonDivProps>`
    padding: ${spacing[1]} ${spacing[3]};
    background: ${props => props.color ? _genButtonTheme(props.color) : colors.brand.green};
    color: ${colors.white};

    &.minimal {
        background: transparent;
        color: ${props => props.color ? _genButtonTheme(props.color) : colors.brand.green};
        font-size: ${textSize.sm};
    }
`