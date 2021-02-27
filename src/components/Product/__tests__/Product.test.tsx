import { mount, shallow } from 'enzyme';
import React from 'react';

import Product from '../Product';

describe('Product', () => {
  it('Product needs some tests', () => {
    const COMPONENT = mount(<Product />);
    expect(1).toEqual(2); // Fails as a reminder
  });
});
