import React from 'react';
import {ModalDiv, ModalInnerDiv} from './styles/ModalStyles';
import { ModalProps } from './types';

const Modal: React.FC<ModalProps> = ({children, isOpen}) => {
    return (
        <ModalDiv className={isOpen ? '' : 'hidden'}>
            <ModalInnerDiv>
                {children}
            </ModalInnerDiv>
        </ModalDiv>
    );
};

export default Modal;