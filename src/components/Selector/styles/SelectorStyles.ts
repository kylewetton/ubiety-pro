import styled from 'styled-components';
import {colors, radius, spacing} from '../../../theme';


const _genSelectorTheme = (color: string) => {
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

const space = 3; 

export const SelectorDiv = styled.div`
    display: inline-flex;
    align-items: stretch;
    margin-right: ${spacing[12]};
    * {
        color: ${colors.white};
        fill: ${colors.white};
        stroke: ${colors.white};
    }
    `
export const SelectorMenu = styled.div`
    padding: ${spacing[space]};
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => props.color ? _genSelectorTheme(props.color) : colors.brand.green};
`
export const SelectorTitle = styled.div`
 background: ${props => props.color ? _genSelectorTheme(props.color) : colors.brand.green};
 padding: ${spacing[space]} ${spacing[space * 4]} ${spacing[space]} ${spacing[space]};
 flex: 1 1 auto;
`
export const SelectorArrows = styled.div`
display: flex;
    
`
export const SelectorArrow = styled.div`
 background: ${props => props.color ? _genSelectorTheme(props.color) : colors.brand.green};
 display: flex;
 align-items: center;
 justify-content: center;
 cursor: pointer;
 width: ${spacing[12]};
 svg {
    transition: 250ms ease-out;
 }
 &:hover {
     svg {
         transform: scale(1.2);
     }
 }
 &.prev {
    position: relative;
    margin-left: ${spacing[space]};
 }
 &.prev::after {
     content: '';
     display: block;
     position: absolute;
     right: -1px;
     width: 2px;
     height: 50%;
     background: ${colors.white};
    }
 &.next {
 }
    
`