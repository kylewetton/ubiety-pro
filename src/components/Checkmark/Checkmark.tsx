import React from 'react';
import Icon from '../Icon';
import {CheckmarkDiv} from './styles/CheckmarkStyles';
import { CheckmarkProps } from './types';

const Checkmark: React.FC<CheckmarkProps> = () => {
    return (
        <CheckmarkDiv>
            <Icon icon={'check'} />
        </CheckmarkDiv>
    );
};

export default Checkmark;