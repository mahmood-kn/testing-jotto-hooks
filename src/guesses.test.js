import React from 'react';
import { mount } from 'enzyme';
import { findByTestAttr } from './test/testUtils';
import successContext from './context/successContext';
import Input from './Input';

function setup(secretWord = 'party') {
  const wrapper = mount(
    <successContext.SuccessProvider>
      <Input secretWord={secretWord} />
    </successContext.SuccessProvider>
  );
  const inputBox = findByTestAttr(wrapper, 'input-box');
  const submitBtn = findByTestAttr(wrapper, 'submit-button');
  return [wrapper, inputBox, submitBtn];
}

describe('test word guesses', () => {
  let wrapper;
  let inputBox;
  let submitBtn;

  beforeEach(() => {
    [wrapper, inputBox, submitBtn] = setup('party');
  });
  describe('correct guess', () => {
    beforeEach(() => {
      const mockEvent = { target: { value: 'party' } };
      inputBox.simulate('change', mockEvent);
      submitBtn.simulate('click');
    });
    test('Input component contains no children', () => {
      const inputComponent = findByTestAttr(wrapper, 'component-input');
      expect(inputComponent.children().length).toBe(0);
    });
  });

  describe('incorrect guess', () => {
    beforeEach(() => {
      const mockEvent = { target: { value: 'train' } };
      inputBox.simulate('change', mockEvent);
      submitBtn.simulate('click');
    });
    test('input box remains', () => {
      expect(inputBox.exists()).toBe(true);
    });
  });
});
