import React, { useEffect, useState } from 'react';
import uuid from 'react-uuid';
import {useIntl} from 'react-intl';
import {fabric} from 'fabric';
import {ImageEditorDiv, ImageEditorButtonTrayDiv, ImageEditorStencil, ImageEditorProgressDiv} from './styles/ImageEditorStyles';
import { ImageEditorProps } from './types';
import { useSelector, useDispatch } from 'react-redux';
import { getActiveSection, getProductCustomImage, getProductCustomImagePos } from '../../store/product/selectors';
import { productApplyCustomImage, productSetCustomImage, productToggleCustomImagePos, productClearCustomImage, destroyCustomTextureFromActive } from '../../store/product/actions';
import ImageUpload from '../ImageUpload';
import Button from '../Button';
import Modal from '../../layout/Modal';
import { interfaceToggleModal } from '../../store/interface/actions';
import { interfaceGetModalState } from '../../store/interface/selectors';
import Dots from '../Dots';

const ImageEditor: React.FC<ImageEditorProps> = () => {
    
    const dispatch = useDispatch();
    const [editor, setEditor] = useState<any>(null);
    const uniq = uuid();
    const dimensions = 480;
    const canvasPadding = 10; // Relates to image size vs canvas size
    const customImageUrl = useSelector(getProductCustomImage);
    const modalState = useSelector(interfaceGetModalState('customImage'));
    const intl = useIntl();
    const [activeSection] = useSelector(getActiveSection);
    const customImagePos = useSelector(getProductCustomImagePos);

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

    const _generateCustomTexture = (goToNextPosition = false) => {
        const texture = editor.toDataURL({multiplier: 1024 / dimensions});
        // _handleCloseCustomImageModal();
        fetch(texture)
        .then(res => res.blob())
        .then(window.URL.createObjectURL)
        .then(objectUrl => {
            dispatch(productApplyCustomImage(objectUrl))
            
            if (goToNextPosition) {
                dispatch(productToggleCustomImagePos(1));
            } else {
                dispatch(productToggleCustomImagePos(0));
                _handleCloseCustomImageModal();
            }
        });

        
    }
    
    const _handleUpload = (url: string) => {
        dispatch(productSetCustomImage(url));
    }

    const _clearCustomTexture = () => {
        if (editor) editor.dispose();
        setEditor(null);
        _handleCloseCustomImageModal();
        dispatch(destroyCustomTextureFromActive());
        dispatch(productClearCustomImage());
    }



    const _renderContent = () => {
        if (customImageUrl)
        return (
                <ImageEditorDiv>
                    {activeSection.customStencil && editor && 
                        <ImageEditorStencil mirror={customImagePos === 1} src={activeSection.customStencil} />
                    }
                    <canvas id={`image-editor-${uniq}`} />

                    <ImageEditorProgressDiv>
                        <p>{intl.formatMessage({id : customImagePos === 0 ? 'modal.image-editor.stencil-note.outside' : 'modal.image-editor.stencil-note.inside'})}</p>
                        <Dots count={2} activeIndex={customImagePos} onClick={(idx) => dispatch(productToggleCustomImagePos(idx))} />
                    </ImageEditorProgressDiv>

                    <ImageEditorButtonTrayDiv>
                        <div>
                            <Button minimal color={'red'} onClick={_clearCustomTexture}>
                                {intl.formatMessage({id : 'modal.image-editor.clear'})}
                            </Button>
                        </div>
                        
                        <div>
                            <Button color={'gray'} onClick={_handleCloseCustomImageModal}>
                                {intl.formatMessage({id : 'modal.image-editor.close'})}
                            </Button>
                            {customImagePos === 0 ? 
                            (<Button color={'green'} onClick={() => _generateCustomTexture(true)}>
                                {intl.formatMessage({id : 'modal.image-editor.next'})}
                            </Button>)
                            :
                            (<Button color={'green'} onClick={() => _generateCustomTexture(false)}>
                                {intl.formatMessage({id : 'modal.image-editor.confirm'})}
                            </Button>)
                            }
                        </div>
                    </ImageEditorButtonTrayDiv>
                </ImageEditorDiv>  
        );
    
        return (
                <ImageEditorDiv>
                    <ImageUpload uploadImage={_handleUpload} />
                        <ImageEditorButtonTrayDiv>
                            <div>
                                <Button minimal color={'red'} onClick={_clearCustomTexture}>
                                    {intl.formatMessage({id : 'modal.image-editor.clear'})}
                                </Button>
                            </div>
                            <div>
                                <Button color={'gray'} onClick={_handleCloseCustomImageModal}>
                                    {intl.formatMessage({id : 'modal.image-editor.close'})}
                                </Button>
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