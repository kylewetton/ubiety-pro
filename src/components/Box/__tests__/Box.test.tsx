import { mount, shallow } from 'enzyme';
import React from 'react';

import Box from '../Box';

describe('Box', () => {
  it('Box needs some tests', () => {
    const COMPONENT = mount(<Box />);
    expect(1).toEqual(2); // Fails as a reminder
  });
});
