import styled from 'styled-components';
import { ImageEditorProps } from '../types';
import {colors, radius, spacing} from '../../../theme';

export const ImageEditorDiv = styled.div<ImageEditorProps>`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9999;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    background: white;
`
