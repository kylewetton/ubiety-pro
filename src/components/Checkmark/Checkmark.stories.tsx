import React from 'react';
import { Story, Meta } from '@storybook/react';
import {Preflight} from '../../theme';
import Checkmark from './Checkmark';
import { CheckmarkProps } from './types';

export default {
    title: 'Components/Checkmark',
    component: Checkmark,
} as Meta;

const Template: Story<CheckmarkProps> = (args) => (
    <>
        <Preflight />
        <Checkmark {...args} >
            Boxed Checkmark component successfully...
        </Checkmark>
    </>
)

export const Primary = Template.bind({});
Primary.args = {
    // status: 'blue'
};