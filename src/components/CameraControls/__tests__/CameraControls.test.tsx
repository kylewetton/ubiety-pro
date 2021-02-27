import { mount, shallow } from 'enzyme';
import React from 'react';

import CameraControls from '../CameraControls';

describe('CameraControls', () => {
  it('CameraControls needs some tests', () => {
    const COMPONENT = mount(<CameraControls />);
    expect(1).toEqual(2); // Fails as a reminder
  });
});
