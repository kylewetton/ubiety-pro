import React from 'react';
import { Story, Meta } from '@storybook/react';
import {Preflight} from '../../theme';
import CameraControls from './CameraControls';
import { CameraControlsProps } from './types';

export default {
    title: 'Components/CameraControls',
    component: CameraControls,
} as Meta;

const Template: Story<CameraControlsProps> = (args) => (
    <>
        <Preflight />
        <CameraControls {...args} >
            Boxed CameraControls component successfully...
        </CameraControls>
    </>
)

export const Primary = Template.bind({});
Primary.args = {
    // status: 'blue'
};