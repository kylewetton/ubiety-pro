import { mount, shallow } from 'enzyme';
import React from 'react';

import CustomMaterial from '../CustomMaterial';

describe('CustomMaterial', () => {
  it('CustomMaterial needs some tests', () => {
    const COMPONENT = mount(<CustomMaterial />);
    expect(1).toEqual(2); // Fails as a reminder
  });
});
