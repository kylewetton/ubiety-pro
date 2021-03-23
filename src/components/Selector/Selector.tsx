import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {SelectorDiv, SelectorMenu, SelectorTitle, SelectorArrows, SelectorArrow} from './styles/SelectorStyles';
import {productSetTextureToActive} from '../../store/product/actions';
import { SelectorProps } from './types';
import { getActiveSection } from '../../store/product/selectors';
import Icon from '../Icon';

const Selector: React.FC<SelectorProps> = ({type, color = 'green'}) => {
    
    const dispatch = useDispatch();
    /**
     * Data
     */

    const [activeSection] = useSelector(getActiveSection);

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
        <SelectorDiv color={color}>
            <SelectorMenu>
                <Icon icon={'menu'} />
            </SelectorMenu>
            <SelectorTitle>
                Materials / {CURRENT.label}
            </SelectorTitle>
            <SelectorArrows>
                <SelectorArrow className={'prev'} onClick={() => _handleCycleSelector('<')} >
                    <Icon icon={'left'} />
                </SelectorArrow>
                <SelectorArrow className={'next'} onClick={() => _handleCycleSelector('>')} >
                    <Icon icon={'right'} />
                </SelectorArrow>
            </SelectorArrows>
        </SelectorDiv>
    );
};

export default Selector;