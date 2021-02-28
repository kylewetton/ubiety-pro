import React from 'react';
import { Story, Meta } from '@storybook/react';
import {Preflight} from '../../theme';
import Button from './Button';
import { ButtonProps } from './types';

export default {
    title: 'Components/Button',
    component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args) => (
    <>
        <Preflight />
        <Button {...args} >
            Boxed Button component successfully...
        </Button>
    </>
)

export const Primary = Template.bind({});
Primary.args = {
    // status: 'blue'
};