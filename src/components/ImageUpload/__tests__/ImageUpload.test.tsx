import { mount, shallow } from 'enzyme';
import React from 'react';

import ImageUpload from '../ImageUpload';

describe('ImageUpload', () => {
  it('ImageUpload needs some tests', () => {
    const COMPONENT = mount(<ImageUpload />);
    expect(1).toEqual(2); // Fails as a reminder
  });
});
