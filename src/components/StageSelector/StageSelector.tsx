import React from 'react';
import Button from '../Button';
import {StageSelectorDiv, StageSelectorAccent} from './styles/StageSelectorStyles';
import { StageSelectorProps } from './types';

const StageSelector: React.FC<StageSelectorProps> = ({children, onClick, active}) => {
    return (
        <StageSelectorDiv active={active} onClick={onClick}>
            <Button align={'left'} block big boldupper>
                {children}
            </Button>
            <StageSelectorAccent active={active}/>
        </StageSelectorDiv>
    );
};

export default StageSelector;