import { mount, shallow } from 'enzyme';
import React from 'react';

import Icon from '../Icon';

describe('Icon', () => {
  it('Icon needs some tests', () => {
    const COMPONENT = mount(<Icon />);
    expect(1).toEqual(2); // Fails as a reminder
  });
});
