import React from 'react';
import {ButtonEl} from './styles/ButtonStyles';
import { ButtonProps } from './types';

const Button: React.FC<ButtonProps> = ({children, color = 'green', minimal, onClick}) => {
    return (
        <ButtonEl color={color} onClick={e => onClick && onClick(e)} className={minimal ? 'minimal' : ''}>{children}</ButtonEl>
    );
};

export default Button;