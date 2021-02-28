import { mount, shallow } from 'enzyme';
import React from 'react';

import Button from '../Button';

describe('Button', () => {
  it('Button needs some tests', () => {
    const COMPONENT = mount(<Button />);
    expect(1).toEqual(2); // Fails as a reminder
  });
});
