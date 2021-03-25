import React from 'react';
import { Story, Meta } from '@storybook/react';
import {Preflight} from '../../theme';
import TextEditor from './TextEditor';
import { TextEditorProps } from './types';

export default {
    title: 'Components/TextEditor',
    component: TextEditor,
} as Meta;

const Template: Story<TextEditorProps> = (args) => (
    <>
        <Preflight />
        <TextEditor {...args} >
            Boxed TextEditor component successfully...
        </TextEditor>
    </>
)

export const Primary = Template.bind({});
Primary.args = {
    // status: 'blue'
};