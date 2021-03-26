import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useIntl} from 'react-intl';
import { HexColorPicker, HexColorInput } from "react-colorful";
import {getProductStampaColor} from '../../store/product/selectors';
import {StampaColorPickerDiv, StampaColorPickerPalette} from './styles/StampaColorPickerStyles';
import { productSetStampaColor } from '../../store/product/actions';
import { StampaColorPickerProps } from './types';
import Button from '../Button';

const StampaColorPicker: React.FC<StampaColorPickerProps> = () => {
    const dispatch = useDispatch();
    const stampaColor = useSelector(getProductStampaColor);
    const intl = useIntl();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <StampaColorPickerDiv>
            <StampaColorPickerPalette active={isOpen}>
                <HexColorPicker style={{borderRadius: 0}} color={stampaColor} onChange={color => dispatch(productSetStampaColor(color))} />
                <HexColorInput style={{width: '100%', padding: '5px 10px', backgroundColor: 'rgba(225,225,225, 0.6)', borderRadius: '3px', marginTop: '5px'}} color={stampaColor} onChange={color => dispatch(productSetStampaColor(color))} />
            </StampaColorPickerPalette>
            <Button onClick={() => setIsOpen(prev => !prev)} color={'blue'} big boldupper>{intl.formatMessage({id: isOpen ? 'stage.initials.button.color-add' : 'stage.initials.button.color-edit'})}</Button>
        </StampaColorPickerDiv>
    );
};

export default StampaColorPicker;