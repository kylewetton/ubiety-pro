import styled from 'styled-components';
import {colors} from '../../../theme';

export const LetterInitialDiv = styled.div`
    position: relative;
    height: 78px;
    width: 78px;
    cursor: pointer;
    flex: 1 0 auto;
    img {
        height: 100%;
        width: 100%;
    }
    &:after {
        display: block;
        content: '';
        width: 2px;
        height: 50%;
        position: absolute;
        z-index: 2;
        top: 0; right: -1px;
        transform: translateY(50%);
        background-color: ${colors.brand.blue};
    }
    &:last-child:after {
        display: none;
    }
`