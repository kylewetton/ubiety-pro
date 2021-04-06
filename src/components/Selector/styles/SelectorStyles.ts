import styled from 'styled-components';
import {boxShadow, colors, breakpoints, spacing, textSize} from '../../../theme';


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
    position: relative;
    display: inline-flex;
    align-items: stretch;
    margin-right: 0;
    margin-bottom: ${spacing[1]};

    @media (min-width: ${breakpoints.md}) {
        margin-right: ${spacing[6]};
    }
    @media (min-width: ${breakpoints.lg}) {
        margin-right: ${spacing[12]};
    }
    `
export const SelectorMenu = styled.div`
    padding: ${spacing[2]};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => props.color ? _genSelectorTheme(props.color) : colors.brand.green};
    svg, path {
        stroke: ${colors.white};
    }    
    @media (min-width: ${breakpoints.lg}) {
        padding: ${spacing[space]};
    }
`
export const SelectorTitle = styled.div`
 display: flex;
 align-items: center;
 background: ${props => props.color ? _genSelectorTheme(props.color) : colors.brand.green};
 padding: ${spacing[2]};
 padding-right: ${spacing[4]};
 flex: 1 1 auto;
 color: ${colors.white};
 font-size: ${textSize.sm};

 @media (min-width: ${breakpoints.lg}) {
    padding: ${spacing[space]} ${spacing[space * 4]} ${spacing[space]} ${spacing[space]};
    font-size: ${textSize.base};
 }
`
export const SelectorArrows = styled.div`
    display: flex;
    svg, path {
        fill: ${colors.white};
    }
`
export const SelectorArrow = styled.div`
 background: ${props => props.color ? _genSelectorTheme(props.color) : colors.brand.green};
 display: flex;
 align-items: center;
 justify-content: center;
 cursor: pointer;
 width: ${spacing[10]};
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
 @media (min-width: ${breakpoints.lg}) {
    width: ${spacing[12]};
 }
`

export const SelectorList = styled.ul`
 position: absolute;
 left: 0; right: 0; top: 0; bottom: auto;
 display: none;
 transform: translateY(calc((100% + ${spacing[3]}) * -1));
 box-shadow: ${boxShadow.xlTop}, ${boxShadow.lg};
 margin-bottom: ${spacing[3]};
 transition: 250ms ease-out;
 &.expanded {
     display: block;
 }
 `
 export const SelectorListItem = styled.li`
 display: flex;
 justify-content: space-between;
 align-items: center;
 background-color: ${colors.white};
 padding: ${spacing[2]} ${spacing[3]};
 font-size: ${textSize.sm};
 color: ${colors.brand.blue};
 border-bottom: 1px solid ${colors.gray[200]};
 cursor: pointer;
 transition: 250ms ease-out;
 &:hover {
     padding-left: ${spacing[4]};
     background: ${colors.gray[50]};
 }

 &:last-child {
     border-bottom: 0;
 }
svg {
    fill: ${colors.brand.blue};
    stroke: ${colors.brand.blue};   
}

@media (min-width: ${breakpoints.md}) {
    font-size: ${textSize.base};
    padding: ${spacing[3]};
}
`