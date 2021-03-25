import React from 'react';
import {ButtonEl} from './styles/ButtonStyles';
import { ButtonProps } from './types';

const Button: React.FC<ButtonProps> = ({children, align = 'center', color = 'green', minimal, onClick, big, block, boldupper}) => {
    return (
        <ButtonEl boldupper={boldupper} align={align} block={block} big={big} color={color} onClick={e => onClick && onClick(e)} className={minimal ? 'minimal' : ''}>{children}</ButtonEl>
    );
};

export default Button;