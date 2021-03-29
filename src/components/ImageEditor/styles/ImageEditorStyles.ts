import styled from 'styled-components';
import { ImageEditorProps } from '../types';
import {boxShadow, colors, spacing, textSize} from '../../../theme';

export const ImageEditorDiv = styled.div<ImageEditorProps>`
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    background: ${colors.gray[100]};
    padding: ${spacing[3]};
    position: relative;
`
export const ImageEditorButtonTrayDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: ${spacing[4]};
`

export const ImageEditorFontSelector = styled.select`
    padding: ${spacing[2]};
`

export const ImageEditorColorPicker = styled.div`
    position: absolute;
    transform: translate(-25%, calc(-100% - 10px));
    padding: ${spacing[3]};
    z-index: 9999999;
    backdrop-filter: blur(5px);
    box-shadow: ${boxShadow.lg}, ${boxShadow.xlTop};
    &.hidden {
        display: none;
    }
`

export const ImageEditorColorHouse = styled.div`
    position: relative;
    display: flex;
    flex: 1 1 auto;
`

export const ImageEditorStencil = styled.img<{mirror: boolean}>`
    position: absolute;
    top: ${spacing[3]}; left: ${spacing[3]}; right: ${spacing[3]}; bottom: ${spacing[3]};
    width: 480px;
    height: 480px;
    z-index: 3;
    pointer-events: none;
    ${props => props.mirror ? `transform: scaleX(-1)` : null};
`

export const ImageEditorProgressDiv = styled.div`
    padding: ${spacing[2]} ${spacing[4]};
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: ${textSize.xs};
    text-transform: uppercase;
    background: ${colors.gray[200]};
    p {
        color: ${colors.gray[500]};
        margin-right: ${spacing[2]};
        margin-bottom: 0;
        line-height: 1;
    }
`