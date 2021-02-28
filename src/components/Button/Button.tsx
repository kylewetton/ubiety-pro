import React from 'react';
import {ButtonEl} from './styles/ButtonStyles';
import { ButtonProps } from './types';

const Button: React.FC<ButtonProps> = ({children, className, onClick}) => {
    return (
        <ButtonEl onClick={e => onClick && onClick(e)} className={className}>{children}</ButtonEl>
    );
};

export default Button;