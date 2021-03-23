import styled from 'styled-components';
import {colors, radius, spacing, textSize, boxShadow} from '../../../theme';

export const UploadArea = styled.div<{draggingOver: boolean}>`
    background-color: ${colors.gray[100]};
    border-radius: ${radius.sm};
    padding: 0 ${spacing[24]};
    height: 480px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    color: ${colors.brand.green};
    text-align: center;
    overflow: hidden;
    * {
        position: relative;
        z-index: 2;
    }
    &:before {
        content: '';
        display: block;
        position: absolute;
        z-index: 1;
        border: 2px dashed ${({draggingOver}) => draggingOver ? colors.brand.green : colors.brand.mint};
        border-radius: ${radius.sm};
        top: ${spacing[4]};
        left: ${spacing[4]};
        bottom: ${spacing[4]};
        right: ${spacing[4]};
        transition: border 0.25 ease-out;
    };
`

export  const LabelPill = styled.label`
background-color: ${colors.brand.green};
display: inline-block;
cursor: pointer;
color: ${colors.white};
padding: ${spacing[2]} ${spacing[3]};
line-height: 1;
margin: ${spacing[1]};
font-size: ${textSize.sm};
transition: transform 0.25 ease-out;
&:hover {
    box-shadow: ${boxShadow.sm};
    transform: translateY(-1px);
}
&:active {
    box-shadow: ${boxShadow.input};
    transform: translateY(0);
}
`

export const ErrorPanel = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: ${spacing[3]};
    background-color: ${colors.rose[500]};
    color: ${colors.white};
    text-center;
    font-weight: medium;
    font-size: ${textSize.sm};
    animation: slideOut 0.5s ease-out 3s forwards;

    @keyframes slideOut {
        from {
            top: 0
        }
        to {
            top: -100px;
        }
    }
`