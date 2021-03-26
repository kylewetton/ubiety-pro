import { mount, shallow } from 'enzyme';
import React from 'react';

import StampaColorPicker from '../StampaColorPicker';

describe('StampaColorPicker', () => {
  it('StampaColorPicker needs some tests', () => {
    const COMPONENT = mount(<StampaColorPicker />);
    expect(1).toEqual(2); // Fails as a reminder
  });
});
