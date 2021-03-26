import { mount, shallow } from 'enzyme';
import React from 'react';

import LetterInitial from '../LetterInitial';

describe('LetterInitial', () => {
  it('LetterInitial needs some tests', () => {
    const COMPONENT = mount(<LetterInitial />);
    expect(1).toEqual(2); // Fails as a reminder
  });
});
