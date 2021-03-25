import React, { useEffect, useState } from 'react';
import {fabric} from 'fabric';
import {ImageEditorDiv, ImageEditorButtonTrayDiv, ImageEditorFontSelector} from '../ImageEditor/styles/ImageEditorStyles';
import { TextEditorProps } from './types';
import config from '../../config/brandConfig';
import { useSelector, useDispatch } from 'react-redux';
import { getActiveSection } from '../../store/product/selectors';
import { productApplyCustomImage, productClearCustomImage, destroyCustomTextureFromActive } from '../../store/product/actions';
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

    const _changeTextColor = () => {
        textNode.set("fill", 'red');
    }


    const _renderContent = () => {
        
        return (
                <ImageEditorDiv>
                    <canvas id={`image-editor-text`} />
                    <ImageEditorButtonTrayDiv>
                        <div>
                            <Button color={'green'} onClick={_generateCustomTexture}>Confirm</Button>
                            <ImageEditorFontSelector onChange={event => _changeFont(event.target.value)} id="">
                                <option value="Arial">Arial</option>
                                <option value="Georgia">Georgia</option>
                                <option value="system-ui">System</option>
                            </ImageEditorFontSelector>
                        </div>
                        
                        <div>
                            <Button color={'gray'} minimal onClick={_destroyCustomTexture}>Remove Texture</Button>
                            <Button color={'gray'} onClick={_handleCloseCustomImageModal}>Close</Button>
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