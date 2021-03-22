import { mount, shallow } from 'enzyme';
import React from 'react';

import ImageEditor from '../ImageEditor';

describe('ImageEditor', () => {
  it('ImageEditor needs some tests', () => {
    const COMPONENT = mount(<ImageEditor />);
    expect(1).toEqual(2); // Fails as a reminder
  });
});
