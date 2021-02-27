import React from 'react';
import { Story, Meta } from '@storybook/react';
import {Preflight} from '../../theme';
import CustomMaterial from './CustomMaterial';
import { CustomMaterialProps } from './types';

export default {
    title: 'Components/CustomMaterial',
    component: CustomMaterial,
} as Meta;

const Template: Story<CustomMaterialProps> = (args) => (
    <>
        <Preflight />
        <CustomMaterial {...args} >
            Boxed CustomMaterial component successfully...
        </CustomMaterial>
    </>
)

export const Primary = Template.bind({});
Primary.args = {
    // status: 'blue'
};