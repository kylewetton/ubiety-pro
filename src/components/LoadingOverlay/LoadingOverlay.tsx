import React from 'react';
import Icon from '../Icon';
import {LoadingOverlayDiv} from './styles/LoadingOverlayStyles';
import { LoadingOverlayProps } from './types';

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({message}) => {
    return (
        <LoadingOverlayDiv>
            <Icon icon={'logo'} />
            <p>{message}</p>
        </LoadingOverlayDiv>
    );
};

export default LoadingOverlay;