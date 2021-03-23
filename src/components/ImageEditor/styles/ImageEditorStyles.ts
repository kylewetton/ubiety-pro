import styled from 'styled-components';
import { ImageEditorProps } from '../types';
import {colors, radius, spacing} from '../../../theme';

export const ImageEditorDiv = styled.div<ImageEditorProps>`
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    background: ${colors.gray[100]};
    padding: ${spacing[3]};
`
export const ImageEditorButtonTrayDiv = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: ${spacing[4]};
`