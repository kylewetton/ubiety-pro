import React from 'react';
import { Story, Meta } from '@storybook/react';
import {Preflight} from '../../theme';
import World from './World';
import { WorldProps } from './types';

export default {
    title: 'Components/World',
    component: World,
} as Meta;

const Template: Story<WorldProps> = (args) => (
    <>
        <Preflight />
        <World {...args} >
            Boxed World component successfully...
        </World>
    </>
)

export const Primary = Template.bind({});
Primary.args = {
    // status: 'blue'
};