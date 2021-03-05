import React from 'react';
import { Story, Meta } from '@storybook/react';
import {Preflight} from '../../theme';
import Selector from './Selector';
import { SelectorProps } from './types';

export default {
    title: 'Components/Selector',
    component: Selector,
} as Meta;

const Template: Story<SelectorProps> = (args) => (
    <>
        <Preflight />
        <Selector {...args} >
            Boxed Selector component successfully...
        </Selector>
    </>
)

export const Primary = Template.bind({});
Primary.args = {
    // status: 'blue'
};