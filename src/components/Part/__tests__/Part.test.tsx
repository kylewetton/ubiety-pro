import { mount, shallow } from 'enzyme';
import React from 'react';

import Part from '../Part';

describe('Part', () => {
  it('Part needs some tests', () => {
    const COMPONENT = mount(<Part />);
    expect(1).toEqual(2); // Fails as a reminder
  });
});
