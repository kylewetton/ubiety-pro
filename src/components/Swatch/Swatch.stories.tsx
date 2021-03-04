import React from 'react';
import { Story, Meta } from '@storybook/react';
import {Preflight} from '../../theme';
import Swatch from './Swatch';
import { SwatchProps } from './types';

export default {
    title: 'Components/Swatch',
    component: Swatch,
} as Meta;

const Template: Story<SwatchProps> = (args) => (
    <>
        <Preflight />
        <Swatch {...args} >
            Boxed Swatch component successfully...
        </Swatch>
    </>
)

export const Primary = Template.bind({});
Primary.args = {
    // status: 'blue'
};