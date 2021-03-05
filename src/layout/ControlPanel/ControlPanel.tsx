import React from 'react';
import {ControlPanelDiv} from './styles/ControlPanelStyles';
import { ControlPanelProps } from './types';

const ControlPanel: React.FC<ControlPanelProps> = ({children}) => {
    return (
        <ControlPanelDiv>{children}</ControlPanelDiv>
    );
};

export default ControlPanel;