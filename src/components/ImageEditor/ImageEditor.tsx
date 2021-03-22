import React, { useEffect, useState } from 'react';
import uuid from 'react-uuid';
import {fabric} from 'fabric';
import {ImageEditorDiv} from './styles/ImageEditorStyles';
import { ImageEditorProps } from './types';
import { useSelector, useDispatch } from 'react-redux';
import { getProductCustomImage } from '../../store/product/selectors';
import { productApplyCustomImage } from '../../store/product/actions';

const ImageEditor: React.FC<ImageEditorProps> = () => {
    
    const dispatch = useDispatch();
    const [editor, setEditor] = useState<any>();
    const uniq = uuid();
    const dimensions = 480;
    const canvasPadding = 10; // Relates to image size vs canvas size
    const customImageUrl = useSelector(getProductCustomImage);

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
    }, []);

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

    const _generateCustomTexture = () => {
        const texture = editor.toDataURL({multiplier: 1024 / dimensions});
        fetch(texture)
        .then(res => res.blob())
        .then(window.URL.createObjectURL)
        .then(objectUrl => dispatch(productApplyCustomImage(objectUrl)))
        
    }

    return (
        <ImageEditorDiv>
            <canvas
                id={`image-editor-${uniq}`}
            />
            <button onClick={_generateCustomTexture}>Add image to active section</button>
        </ImageEditorDiv>
    );
};

export default ImageEditor;