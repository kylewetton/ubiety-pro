import React from 'react';
import { useDispatch } from 'react-redux';
import {SelectorDiv, SelectorMenu, SelectorTitle, SelectorArrows, SelectorArrow} from './styles/SelectorStyles';
import {productSetTextureToActive} from '../../store/product/actions';
import { SelectorProps } from './types';

const Selector: React.FC<SelectorProps> = ({type, activeSection}) => {
    
    const dispatch = useDispatch();
    /**
     * Data
     */

    const {
        current_material: CURRENT,
        available_materials: AVAILABLE
    }
    = activeSection;

    /**
     * Methods
     */

     const _handleCycleSelector = (direction: '<' | '>') => {
    
        let idx = AVAILABLE.findIndex((avail: any) => avail.uid === CURRENT.uid);
        
           switch(direction)
           {
            case '<' :
                idx = idx === 0 ? AVAILABLE.length - 1 : idx - 1;
                break;
            case '>' :
                idx = idx === AVAILABLE.length - 1 ? 0 : idx + 1;
                break;
            default:
            break;
           }

        dispatch(productSetTextureToActive(AVAILABLE[idx].uid));
     }
    
     if (!AVAILABLE.length)
        return null;
    
    return (
        <SelectorDiv>
            <SelectorMenu></SelectorMenu>
            <SelectorTitle>
                {CURRENT.label}
            </SelectorTitle>
            <SelectorArrows>
                <SelectorArrow onClick={() => _handleCycleSelector('<')} >prev</SelectorArrow>
                <SelectorArrow onClick={() => _handleCycleSelector('>')} >next</SelectorArrow>
            </SelectorArrows>
        </SelectorDiv>
    );
};

export default Selector;