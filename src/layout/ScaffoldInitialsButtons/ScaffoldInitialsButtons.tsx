import React from 'react';
import {ScaffoldInitialsButtonsDiv} from './styles/ScaffoldInitialsButtonsStyles';
import { ScaffoldInitialsButtonsProps } from './types';

const ScaffoldInitialsButtons: React.FC<ScaffoldInitialsButtonsProps> = ({children}) => {
    return (
        <ScaffoldInitialsButtonsDiv>{children}</ScaffoldInitialsButtonsDiv>
    );
};

export default ScaffoldInitialsButtons;