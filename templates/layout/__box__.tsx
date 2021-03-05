import React from 'react';
import {__box__Div} from './styles/__box__Styles';
import { __box__Props } from './types';

const __box__: React.FC<__box__Props> = ({children}) => {
    return (
        <__box__Div>{children}</__box__Div>
    );
};

export default __box__;