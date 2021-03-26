import React, {useState} from 'react';
import {useIntl} from 'react-intl';
import UploadFormlet from './UploadFormlet';
import {UploadArea, ErrorPanel} from './styles/ImageUploadStyles';

interface ImageUploadInterface {
    handleFileUpload: (files: FileList) => void;
    error: string | false;
    clearError: () => void;
}

const ImageUpload: React.FC<ImageUploadInterface> = ({error, handleFileUpload, clearError}) => {

    const intl = useIntl();

    const [draggingOver, setDraggingOver] = useState<boolean>(false);
    
    const dragOver = (e: React.DragEvent<HTMLDivElement>) => {
        clearError();
        e.preventDefault();
    }
    
    const dragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDraggingOver(true);
    }
    
    const dragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDraggingOver(false);
    }
    
    const fileDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        setDraggingOver(false);
        handleFileUpload(files);
    }

    return (
        <UploadArea
        onDragOver={dragOver}
        onDragEnter={dragEnter}
        onDragLeave={dragLeave}
        onDrop={fileDrop}
        draggingOver={draggingOver}
        >
            {error ? <ErrorPanel>{error}</ErrorPanel> : ''}
            <p><UploadFormlet error={error} onClick={clearError} handleUpload={handleFileUpload} /> {intl.formatMessage({id : 'modal.image-upload.upload-text'})}</p>
        </UploadArea>
    );
};

export default ImageUpload;