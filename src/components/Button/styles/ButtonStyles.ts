import styled from 'styled-components';
import {colors, spacing, textSize} from '../../../theme';

interface ButtonDivProps {
    big?: boolean;
}

const _genButtonTheme = (color: string) => {
    switch (color) {
        case 'blue' :
            return colors.brand.blue;
        case 'mint' :
            return colors.brand.mint;
        case 'minimal':
            return colors.gray[500];
        case 'gray' :
            return colors.gray[200];
        case 'green' :
        default :
            return colors.brand.green;
    }
}

export const ButtonEl = styled.button<ButtonDivProps>`
    padding: ${props => props.big ? `${spacing[3]} ${spacing[6]}` : `${spacing[1]} ${spacing[3]}`};
    background: ${props => props.color ? _genButtonTheme(props.color) : colors.brand.green};
    color: ${props => props.color === 'gray' ? colors.gray[500] : colors.white};

    &.minimal {
        background: transparent;
        color: ${props => props.color ? _genButtonTheme('minimal') : colors.brand.green};
        font-size: ${textSize.sm};
    }
`