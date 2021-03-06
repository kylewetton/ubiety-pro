import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import {SelectorDiv, SelectorMenu, SelectorTitle, SelectorArrows, SelectorArrow} from './styles/SelectorStyles';
import {MaterialReference} from '../../store/product/types';
import {productSetTextureToActive} from '../../store/product/actions';
import { SelectorProps } from './types';

const Selector: React.FC<SelectorProps> = ({type, activeSection}) => {
    
    /**
     * Data
     */
    const dispatch = useDispatch();
    const AVAILABLE_MATERIALS = activeSection.available_materials;
    const CURRENT_MATERIAL = activeSection && activeSection.current_material;
    
    /**
     * State
     */
    const [materialIndex, setMaterialIndex] = useState<number>(0);

    useEffect(() => {
        const current = AVAILABLE_MATERIALS.findIndex((material: MaterialReference) => material.uid === CURRENT_MATERIAL.uid);
        setMaterialIndex(current);
    },[])

    /**
     * Methods
     */

     const _handleCycleMaterial = (direction: '<' | '>') => {
         let idx;
         switch(direction) {
             case '<' :
                idx = materialIndex - 1;
                break;
             case '>' :
                idx = materialIndex + 1;
                break;
            default: 
                idx = materialIndex;
         }
         dispatch(productSetTextureToActive(AVAILABLE_MATERIALS[idx].uid));
     }
    
    
    if (!activeSection)
        return <p>No active section</p>;

    return (
        <SelectorDiv>
            <SelectorMenu></SelectorMenu>
            <SelectorTitle>
                {AVAILABLE_MATERIALS[materialIndex].label}
            </SelectorTitle>
            <SelectorArrows>
                <SelectorArrow onClick={() => _handleCycleMaterial('<')} >prev</SelectorArrow>
                <SelectorArrow onClick={() => _handleCycleMaterial('>')} >next</SelectorArrow>
            </SelectorArrows>
        </SelectorDiv>
    );
};

export default Selector;