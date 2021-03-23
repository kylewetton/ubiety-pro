import React, {useState} from 'react';
import ImageUpload from './ImageUpload';

interface UploadError {
    type: 'error';
    message: string;
}

 const handleAllowedFiles = (file: File): UploadError | File => {
    if (/\.(jpe?g|png)$/i.test(file.name) === false )
        return {type: 'error', 'message': 'Sorry, the file must be a JPEG or PNG.'};

    if (file.size * 1e-6 > 2)
        return {type: 'error', message: 'Sorry, the file must be below 2MB'};

    return file;
}


const UploadContainer: React.FC<{uploadImage: (url: string) => void}> = ({uploadImage}) => {

    const [error, setError] = useState<string | false>(false);
    
    const convertToBlob = (files: FileList) => {
        
        
        const file = handleAllowedFiles(files[0]);
        if (!file)
            return false;

        if (!(file instanceof File) && file.hasOwnProperty('type') && file.type === 'error') {   
            setError(file.message);
            return false;
        }
            
        const url = URL.createObjectURL(file);
        uploadImage(url); 
    }

    return (
        <ImageUpload
        error={error}
        clearError={() => setError(false)}
        handleFileUpload={convertToBlob}
        />
    );
};

export default UploadContainer;