import { mount, shallow } from 'enzyme';
import React from 'react';

import TextEditor from '../TextEditor';

describe('TextEditor', () => {
  it('TextEditor needs some tests', () => {
    const COMPONENT = mount(<TextEditor />);
    expect(1).toEqual(2); // Fails as a reminder
  });
});
