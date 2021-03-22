import React from 'react';
import { Story, Meta } from '@storybook/react';
import {Preflight} from '../../theme';
import ImageEditor from './ImageEditor';
import { ImageEditorProps } from './types';

export default {
    title: 'Components/ImageEditor',
    component: ImageEditor,
} as Meta;

const Template: Story<ImageEditorProps> = (args) => (
    <>
        <Preflight />
        <ImageEditor {...args} >
            Boxed ImageEditor component successfully...
        </ImageEditor>
    </>
)

export const Primary = Template.bind({});
Primary.args = {
    // status: 'blue'
};