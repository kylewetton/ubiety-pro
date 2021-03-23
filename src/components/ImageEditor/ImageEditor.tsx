import React, { useEffect, useState } from 'react';
import uuid from 'react-uuid';
import {fabric} from 'fabric';
import {ImageEditorDiv, ImageEditorButtonTrayDiv} from './styles/ImageEditorStyles';
import { ImageEditorProps } from './types';
import { useSelector, useDispatch } from 'react-redux';
import { getProductCustomImage } from '../../store/product/selectors';
import { productApplyCustomImage, productSetCustomImage, productClearCustomImage, destroyCustomTextureFromActive } from '../../store/product/actions';
import ImageUpload from '../ImageUpload';
import Button from '../Button';
import Modal from '../../layout/Modal';
import { interfaceToggleModal } from '../../store/interface/actions';
import { interfaceGetModalState } from '../../store/interface/selectors';

const ImageEditor: React.FC<ImageEditorProps> = () => {
    
    const dispatch = useDispatch();
    const [editor, setEditor] = useState<any>(null);
    const uniq = uuid();
    const dimensions = 480;
    const canvasPadding = 10; // Relates to image size vs canvas size
    const customImageUrl = useSelector(getProductCustomImage);
    const modalState = useSelector(interfaceGetModalState('customImage'));

    /**
     * Instance setup
     */

    useEffect(() => {
            const canvas = new fabric.Canvas(
                `image-editor-${uniq}`,
                {backgroundColor: "#FFFFFF"}
            );
            canvas.setDimensions({width:dimensions, height:dimensions});
            setEditor(canvas);

            return () => {
                if (editor) {
                    editor.dispose();
                    setEditor(null);
                    }
                }
    }, [customImageUrl]);

    /**
     * Add image
     */

    useEffect(() => {
        if (editor && customImageUrl)
        {
            fabric.Image.fromURL(customImageUrl, image => {
                const customImage = image.set({left: canvasPadding, top: canvasPadding});
                customImage.scaleToWidth(dimensions - (canvasPadding * 2));
                editor.add(customImage);
            })
        }
    }, [editor, customImageUrl]);

    /**
     * Methods
     */

     const _handleCloseCustomImageModal = () => {
        dispatch(interfaceToggleModal({id: 'customImage', status: 'closed'}));;
    }

    const _generateCustomTexture = () => {
        const texture = editor.toDataURL({multiplier: 1024 / dimensions});
        _handleCloseCustomImageModal();
        fetch(texture)
        .then(res => res.blob())
        .then(window.URL.createObjectURL)
        .then(objectUrl => dispatch(productApplyCustomImage(objectUrl)))
    }
    
    const _handleUpload = (url: string) => {
        dispatch(productSetCustomImage(url));
    }

    /**
     * Clear: Clear the image editor, but keep the texture on the active section
     */

    const _clearCustomTexture = () => {
        if (editor) editor.dispose();
        setEditor(null);
        dispatch(productClearCustomImage());
    }

    /**
     * Clear the image editor, and REMOVE the texture on the active section
     */

    const _destroyCustomTexture = () => {
        _handleCloseCustomImageModal();
        dispatch(destroyCustomTextureFromActive());
    }



    const _renderContent = () => {
        if (customImageUrl)
        return (
                <ImageEditorDiv>
                    <canvas id={`image-editor-${uniq}`} />
                    <ImageEditorButtonTrayDiv>
                        <div>
                            <Button color={'green'} onClick={_generateCustomTexture}>Confirm</Button>
                            <Button color={'mint'} onClick={_clearCustomTexture}>Clear Editor</Button>
                        </div>
                        
                        <div>
                            <Button color={'gray'} onClick={_handleCloseCustomImageModal}>Close</Button>
                            <Button color={'gray'} minimal onClick={_destroyCustomTexture}>Remove Texture</Button>
                        </div>
                    </ImageEditorButtonTrayDiv>
                </ImageEditorDiv>  
        );
    
        return (
                <ImageEditorDiv>
                    <ImageUpload uploadImage={_handleUpload} />
                        <ImageEditorButtonTrayDiv>
                            <span />
                            <div>
                                <Button color={'gray'} onClick={_destroyCustomTexture}>Close</Button>
                                <Button color={'gray'} minimal onClick={_destroyCustomTexture}>Remove Texture</Button>
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

export default ImageEditor;