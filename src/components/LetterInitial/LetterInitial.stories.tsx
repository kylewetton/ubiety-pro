import React from 'react';
import { Story, Meta } from '@storybook/react';
import {Preflight} from '../../theme';
import LetterInitial from './LetterInitial';
import { LetterInitialProps } from './types';

export default {
    title: 'Components/LetterInitial',
    component: LetterInitial,
} as Meta;

const Template: Story<LetterInitialProps> = (args) => (
    <>
        <Preflight />
        <LetterInitial {...args} >
            Boxed LetterInitial component successfully...
        </LetterInitial>
    </>
)

export const Primary = Template.bind({});
Primary.args = {
    // status: 'blue'
};