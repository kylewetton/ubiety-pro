import React from 'react';
import {DotsDiv, DotSpan} from './styles/DotsStyles';
import { DotsProps } from './types';

const Dot: React.FC<{active: boolean, onClick: () => void}> = ({active, onClick}) => <DotSpan onClick={onClick} active={active} />

const Dots: React.FC<DotsProps> = ({count, activeIndex, onClick}) => {
    const dotArray = new Array(count).fill(null);

    const _handleClick = (idx: 0 | 1) => {
        onClick(idx);
    }
    return (
        <DotsDiv>
           { dotArray.map((dot, idx) => <Dot key={idx} onClick={() => _handleClick((idx as 0 | 1))} active={activeIndex === idx} />) }
        </DotsDiv>
    );
};

export default Dots;