import { mount, shallow } from 'enzyme';
import React from 'react';

import Dots from '../Dots';

describe('Dots', () => {
  it('Dots needs some tests', () => {
    const COMPONENT = mount(<Dots />);
    expect(1).toEqual(2); // Fails as a reminder
  });
});
