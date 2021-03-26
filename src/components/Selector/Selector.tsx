import React, {useState} from 'react';
import {useIntl} from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import {SelectorDiv, SelectorMenu, SelectorListItem, SelectorTitle, SelectorArrows, SelectorArrow, SelectorList} from './styles/SelectorStyles';
import {productSetTextureToActive} from '../../store/product/actions';
import { SelectorProps } from './types';
import { getActiveSection } from '../../store/product/selectors';
import Icon from '../Icon';
import { map } from 'lodash';

const Selector: React.FC<SelectorProps> = ({type, color = 'green'}) => {
    
    const dispatch = useDispatch();
    const intl = useIntl();
    /**
     * Data
     */

    const [activeSection] = useSelector(getActiveSection);
    const [menuOpen, setMenuOpen] = useState<boolean>(false);

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

     const _renderSelectorListItems = () => {

        return AVAILABLE.map((material) => {
            if (CURRENT.uid === material.uid) {
                return (
                    <SelectorListItem key={material.uid}>
                        {material.label}
                        <Icon icon={'check'} />
                    </SelectorListItem>
                )
            }
            return (
                <SelectorListItem key={material.uid} onClick={() => {
                    dispatch(productSetTextureToActive(material.uid));
                    _handleToggleMenu();
                    }
                }>
                    {material.label} <span />
                </SelectorListItem>
            )
        });
     }

    const _handleToggleMenu = () => {
        setMenuOpen(prev => !prev);
    } 
    
     if (!AVAILABLE.length)
        return null;
    
    return (
        <SelectorDiv color={color}>
            <SelectorList className={menuOpen ? 'expanded' : ''}>
               {_renderSelectorListItems()}
            </SelectorList>
            <SelectorMenu color={color} onClick={() => _handleToggleMenu()}>
                <Icon icon={'menu'} />
            </SelectorMenu>
            <SelectorTitle color={color}>
                {intl.formatMessage({id: 'stage.materials.title'})} / {CURRENT.label}
            </SelectorTitle>
            <SelectorArrows>
                <SelectorArrow color={color} className={'prev'} onClick={() => _handleCycleSelector('<')} >
                    <Icon icon={'left'} />
                </SelectorArrow>
                <SelectorArrow color={color} className={'next'} onClick={() => _handleCycleSelector('>')} >
                    <Icon icon={'right'} />
                </SelectorArrow>
            </SelectorArrows>
        </SelectorDiv>
    );
};

export default Selector;