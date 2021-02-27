import React from 'react';
import { Story, Meta } from '@storybook/react';
import {Preflight} from '../../theme';
import Box from './Box';
import { BoxProps } from './types';

export default {
    title: 'Components/Box',
    component: Box,
} as Meta;

const Template: Story<BoxProps> = (args) => (
    <>
        <Preflight />
        <Box {...args} >
            Boxed Box component successfully...
        </Box>
    </>
)

export const Primary = Template.bind({});
Primary.args = {
    // status: 'blue'
};