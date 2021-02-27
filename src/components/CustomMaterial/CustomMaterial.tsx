import React from 'react';
import {useTexture} from '../../hooks';
import { CustomMaterialProps } from './types';

const CustomMaterial: React.FC<CustomMaterialProps> = ({folder}) => useTexture(folder);

export default CustomMaterial;