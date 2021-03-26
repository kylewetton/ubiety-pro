import { mount, shallow } from 'enzyme';
import React from 'react';

import Checkmark from '../Checkmark';

describe('Checkmark', () => {
  it('Checkmark needs some tests', () => {
    const COMPONENT = mount(<Checkmark />);
    expect(1).toEqual(2); // Fails as a reminder
  });
});
