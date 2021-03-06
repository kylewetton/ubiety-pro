import styled from 'styled-components';
import { SelectorProps } from '../types';
import {colors, radius, spacing} from '../../../theme';

export const SelectorDiv = styled.div`
    display: inline-flex;
    align-items: center;
    background: ${colors.coolGray[200]}
`
export const SelectorMenu = styled.div`
 
`
export const SelectorTitle = styled.div`
 padding: ${spacing[4]};
 flex: 1 1 auto;
`
export const SelectorArrows = styled.div`
display: flex;
    
`
export const SelectorArrow = styled.div`
 padding: ${spacing[4]};
 cursor: pointer;
 &:hover {
     color: ${colors.green[400]};
 }
    
`