import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {SelectorDiv, SelectorMenu, SelectorListItem, SelectorTitle, SelectorArrows, SelectorArrow, SelectorList} from '../Selector/styles/SelectorStyles';
import {productSetActivePart, productSetColorToActive} from '../../store/product/actions';
import config from '../../config/brandConfig';
import { SectionSelectorProps } from './types';
import { getAllSections } from '../../store/product/selectors';
import Icon from '../Icon';

const SectionSelector: React.FC<SectionSelectorProps> = ({color = 'green'}) => {
    
    const dispatch = useDispatch();
    /**
     * Data
     */
    const sections = useSelector(getAllSections);
    const [activeSection] = sections.filter(s => s.active);
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    // Disable stops the user from clicking on the item until the color has returned to default
    // This stops the user being able to lock in the hoverColor
    const [disabled, setDisabled] = useState(false);

    const CURRENT = activeSection;
    const AVAILABLE = sections.filter(s => !s.locked);

    /**
     * Methods
     */

     const _handleCycleSelector = (direction: '<' | '>') => {
    
        let idx = AVAILABLE.findIndex((avail: any) => avail.tag === CURRENT.tag);
        
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
        
           if (!disabled) {
                const color = AVAILABLE[idx].color;
                dispatch(productSetActivePart(AVAILABLE[idx].meshPart));
                dispatch(productSetColorToActive(config.hoverColor));
                setTimeout(() => {
                    dispatch(productSetColorToActive(color));
                    setDisabled(false);
                }, 200);
            }
     }

     const _handleToggleMenu = () => {
         setMenuOpen(prev => !prev);
     } 

     const _renderSelectorListItems = () => {

        return AVAILABLE.map((section) => {
            if (CURRENT.tag === section.tag) {
                return (
                    <SelectorListItem key={section.tag}>
                        {section.label}
                        <Icon icon={'check'} />
                    </SelectorListItem>
                )
            }
            return (
                <SelectorListItem key={section.tag} onClick={() => {
                    if (!disabled) {
                        const color = section.color;
                        _handleToggleMenu();
                        dispatch(productSetActivePart(section.meshPart));
                        dispatch(productSetColorToActive(config.hoverColor));
                        setTimeout(() => {
                            dispatch(productSetColorToActive(color));
                            setDisabled(false);
                        }, 200);
                        }
                    }
                }
                >
                    {section.label} <span />
                </SelectorListItem>
            )
        });
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
                {CURRENT.label}
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

export default SectionSelector;