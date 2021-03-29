import React, {useState} from 'react';
import { Story, Meta } from '@storybook/react';
import {Preflight} from '../../theme';
import Dots from './Dots';
import { DotsProps } from './types';

export default {
    title: 'Components/Dots',
    component: Dots,
} as Meta;


const Template: Story<DotsProps> = (args) => {
    const [idx, setIdx] = useState<number>(0);
    
    return (
        <>
            <Preflight />
            <Dots {...args} />
        </>
    )

};

export const Primary = Template.bind({});
Primary.args = {
    count: 3,
    activeIndex: 1,
};