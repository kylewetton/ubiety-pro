import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {SelectorDiv, SelectorMenu, SelectorTitle, SelectorArrows, SelectorArrow} from './styles/SelectorStyles';
import { SelectorProps } from './types';
import { getAllMaterials, getActiveSection } from '../../store/product/selectors';

const Selector: React.FC<SelectorProps> = (props) => {
    const {type} = props;
    const dispatch = useDispatch();
    const [ACTIVE_SECTION] = useSelector(getActiveSection);
    const ALL_MATERIALS = useSelector(getAllMaterials);
    // Create and array of uid from available materials
    const AVAILABLE_MATERIALS = ACTIVE_SECTION ? ACTIVE_SECTION.available_materials.map(mat => mat.uid) : [];
    // Get the actual materials from the store based on those available uids
    const MATERIALS = ALL_MATERIALS.filter(material => AVAILABLE_MATERIALS.includes(material.uid));
    const [CURRENT_MATERIAL] = MATERIALS.filter(material => material.uid === ACTIVE_SECTION.current_material.uid);
    
    if (!ACTIVE_SECTION)
        return <p>No active section</p>;

    return (
        <SelectorDiv>
            <SelectorMenu></SelectorMenu>
            <SelectorTitle>
                {CURRENT_MATERIAL.label}
            </SelectorTitle>
            <SelectorArrows>
                <SelectorArrow></SelectorArrow>
                <SelectorArrow></SelectorArrow>
            </SelectorArrows>
        </SelectorDiv>
    );
};

export default Selector;