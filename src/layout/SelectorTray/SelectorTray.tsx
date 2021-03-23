import React from 'react';
import {SelectorTrayDiv} from './styles/SelectorTrayStyles';
import { SelectorTrayProps } from './types';

const SelectorTray: React.FC<SelectorTrayProps> = ({children}) => {
    return (
        <SelectorTrayDiv>{children}</SelectorTrayDiv>
    );
};

export default SelectorTray;