import React from 'react';
import { Story, Meta } from '@storybook/react';
import {Preflight} from '../../theme';
import StageSelector from './StageSelector';
import { StageSelectorProps } from './types';

export default {
    title: 'Components/StageSelector',
    component: StageSelector,
} as Meta;

const Template: Story<StageSelectorProps> = (args) => (
    <>
        <Preflight />
        <StageSelector {...args} >
            Boxed StageSelector component successfully...
        </StageSelector>
    </>
)

export const Primary = Template.bind({});
Primary.args = {
    // status: 'blue'
};