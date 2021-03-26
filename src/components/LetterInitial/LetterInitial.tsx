import React from 'react';
import Checkmark from '../Checkmark';
import {LetterInitialDiv} from './styles/LetterInitialStyles';
import { LetterInitialProps } from './types';

const LetterInitial: React.FC<LetterInitialProps> = ({letter, onClick, active}) => {
    return (
        <LetterInitialDiv onClick={onClick}>
            <img src={`stampa/thumbnails/stampa-${letter.toUpperCase()}.jpg`} alt={`Initial: ${letter}`}/>
            {active ? <Checkmark/> : null}
        </LetterInitialDiv>
    );
};

export default LetterInitial;