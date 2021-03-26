import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getActiveProductPart, getActiveSection, getMaterialByUid, getProductStampas } from '../../store/product/selectors';
import {SwatchData} from '../../store/product/types';
import {SwatchTrayDiv} from './styles/SwatchTrayStyles';
import { SwatchTrayProps } from './types';
import Swatch from '../Swatch';
import { productSetStampa } from '../../store/product/actions';
import { interfaceGetActiveStage } from '../../store/interface/selectors';
import {getProductStampaPos} from '../../store/product/selectors';
import LetterInitial from '../LetterInitial';

const SwatchTray: React.FC<SwatchTrayProps> = () => {
    const dispatch = useDispatch();
    const ACTIVE_PRODUCT = useSelector(getActiveProductPart);
    const ACTIVE_MATERIALS = useSelector(getMaterialByUid(ACTIVE_PRODUCT ? ACTIVE_PRODUCT.current_material.uid : null));
    const [ACTIVE_SECTION] = useSelector(getActiveSection);
    const STAMPAS = useSelector(getProductStampas);
    const STAMPA_POS = useSelector(getProductStampaPos);
    const SWATCHES = ACTIVE_MATERIALS && ACTIVE_MATERIALS.swatches;
    const ACTIVE_STAGE = useSelector(interfaceGetActiveStage);
    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v','w', 'x', 'y', 'z'];

    
    const _renderSwatchTrayContent = () => {
        if (ACTIVE_STAGE === 'initials')
            return alphabet.map(letter => <LetterInitial active={STAMPAS[STAMPA_POS] === letter} onClick={() => dispatch(productSetStampa({pos: STAMPA_POS, letter}))} key={letter} letter={letter} />);
        return SWATCHES && SWATCHES.map((swatch: SwatchData) => <Swatch active={ACTIVE_SECTION.color === swatch.swatch} key={swatch.label} label={swatch.label} color={swatch.swatch} />)
    }

  if (!ACTIVE_PRODUCT)
      return null;

    return (
        <SwatchTrayDiv>
            {_renderSwatchTrayContent()}
        </SwatchTrayDiv>
    );
};

export default SwatchTray;