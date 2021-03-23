import React from 'react';
import { Story, Meta } from '@storybook/react';
import {Preflight} from '../../theme';
import ImageUpload from './ImageUpload';
import { ImageUploadProps } from './types';

export default {
    title: 'Components/ImageUpload',
    component: ImageUpload,
} as Meta;

const Template: Story<ImageUploadProps> = (args) => (
    <>
        <Preflight />
        <p>Todo</p>
    </>
)

export const Primary = Template.bind({});
Primary.args = {
    // status: 'blue'
};