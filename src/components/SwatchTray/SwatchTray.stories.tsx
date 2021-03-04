import React from 'react';
import { Story, Meta } from '@storybook/react';
import {Preflight} from '../../theme';
import SwatchTray from './SwatchTray';
import { SwatchTrayProps } from './types';

export default {
    title: 'Components/SwatchTray',
    component: SwatchTray,
} as Meta;

const Template: Story<SwatchTrayProps> = (args) => (
    <>
        <Preflight />
        <SwatchTray {...args} >
            Boxed SwatchTray component successfully...
        </SwatchTray>
    </>
)

export const Primary = Template.bind({});
Primary.args = {
    // status: 'blue'
};