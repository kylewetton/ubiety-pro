import React, { useEffect, useState } from 'react';
import {fabric} from 'fabric';
import {useIntl} from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { HexColorPicker, HexColorInput } from "react-colorful";
import {ImageEditorDiv, ImageEditorButtonTrayDiv, ImageEditorFontSelector, ImageEditorColorPicker, ImageEditorColorHouse} from '../ImageEditor/styles/ImageEditorStyles';
import { TextEditorProps } from './types';
import config from '../../config/brandConfig';
import { getActiveSection } from '../../store/product/selectors';
import { productApplyCustomImage, destroyCustomTextureFromActive } from '../../store/product/actions';
import Button from '../Button';
import Modal from '../../layout/Modal';
import { interfaceToggleModal } from '../../store/interface/actions';
import { interfaceGetModalState } from '../../store/interface/selectors';

const TextEditor: React.FC<TextEditorProps> = () => {
  
    const dispatch = useDispatch();
    const [editor, setEditor] = useState<any>(null);
    const dimensions = 480;
    const [activeSection] = useSelector(getActiveSection);
    const modalState = useSelector(interfaceGetModalState('customText'));
    const [lastSubmittedText, setLastSubmittedText] = useState<string>();
    const [textNode, setTextNode] = useState<any>();
    const [textColor, setTextColor] = useState<string>('#000000');
    const [colorPickerOpen, setColorPickerOpen] = useState<boolean>(false);
    const intl = useIntl();

    /**
     * Instance setup
     */

    useEffect(() => {
            const canvas = new fabric.Canvas(
                `image-editor-text`,
                {backgroundColor: activeSection.color}
            );
            canvas.setDimensions({width:dimensions, height:dimensions});
                
            const text = new fabric.IText("Text", {
                left: 200,
                top: 200,
                padding: 7,
                fill: "rgb(0,0,0)",
                fontFamily: 'Arial'
              });
              canvas.add(text);
              text.enterEditing();
              setTextNode(text);
              canvas.setActiveObject(text);

            setEditor(canvas);
    }, []);

    useEffect(() => {
        if (editor && activeSection.color !== config.hoverColor)
        {
            editor.backgroundColor = activeSection.color;
            editor.renderAll();
        }
    }, [activeSection, editor]);


     const _handleCloseCustomImageModal = () => {
        dispatch(interfaceToggleModal({id: 'customImage', status: 'closed'}));;
    }

    const _generateCustomTexture = () => {
        const texture = editor.toDataURL({multiplier: 1024 / dimensions});
        _handleCloseCustomImageModal();
        fetch(texture)
        .then(res => res.blob())
        .then(window.URL.createObjectURL)
        .then(objectUrl => {
            dispatch(productApplyCustomImage(objectUrl))
            setLastSubmittedText(objectUrl);
        })
    }

    useEffect(() => {

        /**
         * If the editor exists and the activeColor isn't just hovercolor flashing
         */
        if (editor && activeSection.color !== config.hoverColor) {
            if (activeSection.custom_texture && activeSection.custom_texture === lastSubmittedText && activeSection.tag === 'quarters') {
                _generateCustomTexture();
            }
        }

    }, [activeSection.color]);

    /**
     * Clear the image editor, and REMOVE the texture on the active section
     */

    const _destroyCustomTexture = () => {
        _handleCloseCustomImageModal();
        dispatch(destroyCustomTextureFromActive());
    }

    const _changeFont = (font: string) => {
        textNode.set("fontFamily", font);
        editor.renderAll();
    }

    useEffect(() => {
        if (textNode) {
            textNode.set("fill", textColor);
            editor.renderAll();
        }
    }, [textColor, textNode]);


    const _renderContent = () => {
        
        return (
                <ImageEditorDiv>
                
                    <canvas id={`image-editor-text`} />
                    <ImageEditorButtonTrayDiv>
                        <div style={{flex: '1 1 auto', display: 'flex'}}>
                            <Button color={'green'} onClick={_generateCustomTexture}>{intl.formatMessage({id: 'modal.text-editor.confirm'})}</Button>
                            <ImageEditorFontSelector onChange={event => _changeFont(event.target.value)} id="">
                                <option value="Arial">Arial</option>
                                <option value="Georgia">Georgia</option>
                                <option value="system-ui">System</option>
                            </ImageEditorFontSelector>
                            <ImageEditorColorHouse>
                                <ImageEditorColorPicker className={colorPickerOpen ? '' : 'hidden'}>
                                    <HexColorPicker style={{borderRadius: 0}} color={textColor} onChange={setTextColor} />
                                    <HexColorInput style={{width: '100%', padding: '5px 10px', backgroundColor: 'rgba(225,225,225, 0.6)', borderRadius: '3px', marginTop: '5px'}} color={textColor} onChange={setTextColor} />
                                </ImageEditorColorPicker>
                                <Button color={'mint'} onClick={() => setColorPickerOpen(prev => !prev)}>{colorPickerOpen ? intl.formatMessage({id: 'modal.text-editor.color-add'}) : intl.formatMessage({id: 'modal.text-editor.color-edit'})}</Button>
                            </ImageEditorColorHouse>
                        </div>
                        
                        <div>
                            <Button color={'gray'} minimal onClick={_destroyCustomTexture}>{intl.formatMessage({id: 'modal.text-editor.remove'})}</Button>
                            <Button color={'gray'} onClick={_handleCloseCustomImageModal}>{intl.formatMessage({id: 'modal.text-editor.close'})}</Button>
                        </div>
                    </ImageEditorButtonTrayDiv>
                </ImageEditorDiv>  
        );
    }

    return (
       <Modal isOpen={modalState === 'open'}>
           {_renderContent()}
       </Modal> 
    );    
};

export default TextEditor;