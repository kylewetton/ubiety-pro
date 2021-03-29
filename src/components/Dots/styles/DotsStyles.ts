import styled from 'styled-components';
import { DotsProps } from '../types';
import {colors, radius, spacing} from '../../../theme';

export const DotsDiv = styled.div`
    display: flex;
`

const sm = `7px`;
const lg = `12px`;

export const DotSpan = styled.span<{active: boolean}>`
    padding: ${props => props.active ? ` ${sm} ${lg}` : ` ${sm}`};
    border-radius: ${radius.full};
    background-color: ${colors.brand.mint};
    opacity: ${props => props.active ? '1' : '0.5'};
    margin-right: ${lg};
    transition: 150ms ease-out;
    cursor: pointer;
    &:hover {
        transform: ${props => props.active ? `scale(1)` : `scale(1.1)`};
    }
    &:last-child {
        margin-right: 0;
    }
`