import { mount, shallow } from 'enzyme';
import React from 'react';

import Swatch from '../Swatch';

describe('Swatch', () => {
  it('Swatch needs some tests', () => {
    const COMPONENT = mount(<Swatch />);
    expect(1).toEqual(2); // Fails as a reminder
  });
});
