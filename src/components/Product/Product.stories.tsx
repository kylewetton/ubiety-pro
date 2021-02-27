import React from 'react';
import { Story, Meta } from '@storybook/react';
import {Preflight} from '../../theme';
import Product from './Product';
import { ProductProps } from './types';

export default {
    title: 'Components/Product',
    component: Product,
} as Meta;

const Template: Story<ProductProps> = (args) => (
    <>
        <Preflight />
        <Product {...args} >
            Boxed Product component successfully...
        </Product>
    </>
)

export const Primary = Template.bind({});
Primary.args = {
    // status: 'blue'
};