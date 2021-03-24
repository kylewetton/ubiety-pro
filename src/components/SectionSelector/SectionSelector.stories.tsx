import React from 'react';
import { Story, Meta } from '@storybook/react';
import {Preflight} from '../../theme';
import SectionSelector from './SectionSelector';
import { SectionSelectorProps } from './types';

export default {
    title: 'Components/SectionSelector',
    component: SectionSelector,
} as Meta;

const Template: Story<SectionSelectorProps> = (args) => (
    <>
        <Preflight />
        <SectionSelector {...args} >
            Boxed Selector component successfully...
        </SectionSelector>
    </>
)

export const Primary = Template.bind({});
Primary.args = {
    // status: 'blue'
};