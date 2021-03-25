import React from 'react';
import { Story, Meta } from '@storybook/react';
import {Preflight} from '../../theme';
import LoadingOverlay from './LoadingOverlay';
import { LoadingOverlayProps } from './types';

export default {
    title: 'Components/LoadingOverlay',
    component: LoadingOverlay,
} as Meta;

const Template: Story<LoadingOverlayProps> = (args) => (
    <>
        <Preflight />
        <LoadingOverlay {...args} >
            Boxed LoadingOverlay component successfully...
        </LoadingOverlay>
    </>
)

export const Primary = Template.bind({});
Primary.args = {
    // status: 'blue'
};