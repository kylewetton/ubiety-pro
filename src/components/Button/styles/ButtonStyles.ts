import styled from 'styled-components';
import {breakpoints, colors, spacing, textSize} from '../../../theme';

interface ButtonDivProps {
    big?: boolean;
    block?: boolean;
    align? : 'left' | 'center' | 'right';
    boldupper?: boolean;
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
    padding: ${spacing[1]} ${spacing[2]};
    background: ${props => props.color ? _genButtonTheme(props.color) : colors.brand.green};
    color: ${props => props.color === 'gray' ? colors.gray[500] : colors.white};
    display: ${props => props.block ? 'block' : 'inline-block'};
    width: ${props => props.block ? '100%' : 'auto'};
    text-align: ${props => props.align};
    font-weight: ${props => props.boldupper ? 'bold' : 'initial'};
    text-transform: ${props => props.boldupper ? 'uppercase' : 'initial'};
    font-size: ${textSize.sm};

    &.minimal {
        background: transparent;
        color: ${props => props.color ? _genButtonTheme('minimal') : colors.brand.green};
        font-size: ${textSize.sm};
    }
    &:focus {
        outline: none;
    }

    @media(min-width: ${breakpoints.lg}) {
        font-size: ${textSize.base};
         padding: ${props => props.big ? `${spacing[3]} ${spacing[2]}` : `${spacing[1]} ${spacing[3]}`};  
        }

    @media(min-width: ${breakpoints.xl}) {
    font-size: ${textSize.base};
     padding: ${props => props.big ? `${spacing[3]} ${spacing[6]}` : `${spacing[1]} ${spacing[3]}`};  
    }
`