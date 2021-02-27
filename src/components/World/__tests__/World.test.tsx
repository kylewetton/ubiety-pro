import { mount, shallow } from 'enzyme';
import React from 'react';

import World from '../World';

describe('World', () => {
  it('World needs some tests', () => {
    const COMPONENT = mount(<World />);
    expect(1).toEqual(2); // Fails as a reminder
  });
});
