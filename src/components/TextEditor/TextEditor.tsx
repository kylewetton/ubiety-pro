import React, { useEffect, useState } from 'react';
import {fabric} from 'fabric';
import {useIntl} from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import _isEqual from 'lodash/isEqual';
import { HexColorPicker, HexColorInput } from "react-colorful";
import {ImageEditorDiv, ImageEditorButtonTrayDiv, ImageEditorStencil, ImageEditorProgressDiv, ImageEditorFontSelector, ImageEditorColorPicker, ImageEditorColorHouse} from '../ImageEditor/styles/ImageEditorStyles';
import { TextEditorProps } from './types';
import config from '../../config/brandConfig';
import { getActiveSection, getProductCustomImagePos } from '../../store/product/selectors';
import { productApplyCustomImage, productToggleCustomImagePos, destroyCustomTextureFromActive } from '../../store/product/actions';
import Button from '../Button';
import Modal from '../../layout/Modal';
import { interfaceToggleModal } from '../../store/interface/actions';
import { interfaceGetModalState } from '../../store/interface/selectors';
import Dots from '../Dots';

const TextEditor: React.FC<TextEditorProps> = () => {
  
    const dispatch = useDispatch();
    const [editor, setEditor] = useState<any>(null);
    const dimensions = 480;
    const modalState = useSelector(interfaceGetModalState('customText'));
    const [lastSubmittedText, setLastSubmittedText] = useState<string>();
    const [textNode, setTextNode] = useState<any>();
    const [textColor, setTextColor] = useState<string>('#000000');
    const [colorPickerOpen, setColorPickerOpen] = useState<boolean>(false);
    const intl = useIntl();
    const [activeSection] = useSelector(getActiveSection);
    const customImagePos = useSelector(getProductCustomImagePos);

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
        dispatch(interfaceToggleModal({id: 'customText', status: 'closed'}));;
    }

    const _generateCustomTexture = (goToNextPosition = false) => {
        const texture = editor.toDataURL({multiplier: 1024 / dimensions});
        fetch(texture)
        .then(res => res.blob())
        .then(window.URL.createObjectURL)
        .then(objectUrl => {
            dispatch(productApplyCustomImage(objectUrl))
            setLastSubmittedText(objectUrl);
            if (goToNextPosition) {
                dispatch(productToggleCustomImagePos(1));
            } else {
                dispatch(productToggleCustomImagePos(0));
                _handleCloseCustomImageModal();
            }
        })
    }

    useEffect(() => {

        /**
         * If the editor exists and the activeColor isn't just hovercolor flashing
         */
        if (editor && activeSection.color !== config.hoverColor) {
            if (activeSection.custom_texture && _isEqual(activeSection.custom_texture, lastSubmittedText) && activeSection.tag === 'quarters') {
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
                    {activeSection.customStencil && 
                        <ImageEditorStencil mirror={customImagePos === 1} src={activeSection.customStencil} />
                    }
                
                    <canvas id={`image-editor-text`} />
                    <ImageEditorProgressDiv>
                        <p>{intl.formatMessage({id : customImagePos === 0 ? 'modal.image-editor.stencil-note.outside' : 'modal.image-editor.stencil-note.inside'})}</p>
                        <Dots count={2} activeIndex={customImagePos} onClick={(idx) => dispatch(productToggleCustomImagePos(idx))} />
                    </ImageEditorProgressDiv>

                    <ImageEditorButtonTrayDiv>
                        <div>
                            <Button color={'red'} minimal onClick={_destroyCustomTexture}>{intl.formatMessage({id: 'modal.text-editor.clear'})}</Button>
                        </div>

                        <div style={{flex: '1 1 auto', display: 'flex', alignItems: 'center'}}>
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
                            <Button color={'gray'} onClick={_handleCloseCustomImageModal}>{intl.formatMessage({id: 'modal.text-editor.close'})}</Button>
                            {customImagePos === 0 ? 
                            (<Button color={'green'} onClick={() => _generateCustomTexture(true)}>
                                {intl.formatMessage({id : 'modal.text-editor.next'})}
                            </Button>)
                            :
                            (<Button color={'green'} onClick={() => _generateCustomTexture(false)}>
                                {intl.formatMessage({id : 'modal.text-editor.confirm'})}
                            </Button>)
                            }
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