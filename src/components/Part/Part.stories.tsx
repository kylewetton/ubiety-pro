import React from 'react';
import { Story, Meta } from '@storybook/react';
import {Preflight} from '../../theme';
import Part from './Part';
import { PartProps } from './types';

export default {
    title: 'Components/Part',
    component: Part,
} as Meta;

const Template: Story<PartProps> = (args) => (
    <>
        <Preflight />
        <Part {...args} >
            Boxed Part component successfully...
        </Part>
    </>
)

export const Primary = Template.bind({});
Primary.args = {
    // status: 'blue'
};