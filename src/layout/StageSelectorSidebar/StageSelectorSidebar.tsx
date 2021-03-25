import React from 'react';
import {StageSelectorSidebarDiv} from './styles/StageSelectorSidebarStyles';
import { StageSelectorSidebarProps } from './types';

const StageSelectorSidebar: React.FC<StageSelectorSidebarProps> = ({children}) => {
    return (
        <StageSelectorSidebarDiv>{children}</StageSelectorSidebarDiv>
    );
};

export default StageSelectorSidebar;