import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {SelectorDiv, SelectorMenu, SelectorTitle, SelectorArrows, SelectorArrow} from './styles/SelectorStyles';
import { SelectorProps } from './types';
import { getAllMaterials, getActiveSection } from '../../store/product/selectors';

const Selector: React.FC<SelectorProps> = (props) => {
    const {type} = props;
    const dispatch = useDispatch();
    const ACTIVE_SECTION = useSelector(getActiveSection);
    const ALL_MATERIALS = useSelector(getAllMaterials);
    // Create and array of uid from available materials
    const AVAILABLE_MATERIALS = ACTIVE_SECTION.length ? ACTIVE_SECTION[0].available_materials.map(mat => mat.uid) : [];
    const MATERIALS = ALL_MATERIALS.filter(material => AVAILABLE_MATERIALS.includes(material.uid));
    console.log('xx', MATERIALS);
    
    if (!ACTIVE_SECTION.length)
        return <p>No active section</p>;

    return (
        <SelectorDiv>
            <SelectorMenu></SelectorMenu>
            <SelectorTitle>
                
            </SelectorTitle>
            <SelectorArrows>
                <SelectorArrow></SelectorArrow>
                <SelectorArrow></SelectorArrow>
            </SelectorArrows>
        </SelectorDiv>
    );
};

export default Selector;