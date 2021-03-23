import React from 'react';
import { Story, Meta } from '@storybook/react';
import {Preflight} from '../../theme';
import Icon from './Icon';
import { IconProps } from './types';

export default {
    title: 'Components/Icon',
    component: Icon,
} as Meta;

const Template: Story<IconProps> = (args) => (
    <>
        <Preflight />
        <Icon {...args} >
            Boxed Icon component successfully...
        </Icon>
    </>
)

export const Primary = Template.bind({});
Primary.args = {
    // status: 'blue'
};