import React from 'react';
import { useSelector } from 'react-redux';
import { getActiveProductPart, getMaterialByUid } from '../../store/product/selectors';
import {SwatchData} from '../../store/product/types';
import {SwatchTrayDiv} from './styles/SwatchTrayStyles';
import { SwatchTrayProps } from './types';
import Swatch from '../Swatch';

const SwatchTray: React.FC<SwatchTrayProps> = () => {
    return <p>TODO Swatch tray</p>;
//     const ACTIVE_PRODUCT = useSelector(getActiveProductPart);
//     const ACTIVE_MATERIALS = useSelector(getMaterialByUid(ACTIVE_PRODUCT ? ACTIVE_PRODUCT.materialUid : null));
//     const SWATCHES = ACTIVE_MATERIALS && ACTIVE_MATERIALS.swatches;
  
//   if (!ACTIVE_PRODUCT)
//       return <p></p>;

//     return (
//         <SwatchTrayDiv>
//             {SWATCHES && SWATCHES.map((swatch: SwatchData) => <Swatch key={swatch.label} label={swatch.label} color={swatch.swatch} />)}
//         </SwatchTrayDiv>
//     );
};

export default SwatchTray;