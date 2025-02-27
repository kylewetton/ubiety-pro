import React from 'react';
import {useIntl} from 'react-intl';
import {LabelPill} from './styles/ImageUploadStyles';

interface UploadFormletInterface {
    onClick: () => void;
    handleUpload: (files: FileList) => void;
    error: string | false;
}

const UploadFormlet: React.FC<UploadFormletInterface> = ({handleUpload, onClick}) => {

    const intl = useIntl();
    
    const handleClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        const element = e.target as HTMLInputElement;
        element.value = '';
        onClick();
    }

    return (
        <>
            <input
            onClick={(e) => handleClick(e)}
            onChange={ (e) => handleUpload((e.target.files as FileList))}
            type="file" id="BtnBrowseHidden" name="files" style={{display: 'none'}} />
            <LabelPill htmlFor="BtnBrowseHidden">
                {intl.formatMessage({id: 'modal.image-upload.upload-button'})}
            </LabelPill>
        </>
    );
};

export default UploadFormlet;