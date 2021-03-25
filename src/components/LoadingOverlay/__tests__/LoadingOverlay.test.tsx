import { mount, shallow } from 'enzyme';
import React from 'react';

import LoadingOverlay from '../LoadingOverlay';

describe('LoadingOverlay', () => {
  it('LoadingOverlay needs some tests', () => {
    const COMPONENT = mount(<LoadingOverlay />);
    expect(1).toEqual(2); // Fails as a reminder
  });
});
