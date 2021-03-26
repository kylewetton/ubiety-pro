import React from 'react';
import { Story, Meta } from '@storybook/react';
import {Preflight} from '../../theme';
import StampaColorPicker from './StampaColorPicker';
import { StampaColorPickerProps } from './types';

export default {
    title: 'Components/StampaColorPicker',
    component: StampaColorPicker,
} as Meta;

const Template: Story<StampaColorPickerProps> = (args) => (
    <>
        <Preflight />
        <StampaColorPicker {...args} >
            Boxed StampaColorPicker component successfully...
        </StampaColorPicker>
    </>
)

export const Primary = Template.bind({});
Primary.args = {
    // status: 'blue'
};