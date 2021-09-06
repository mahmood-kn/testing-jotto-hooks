import { shallow } from 'enzyme';
import { findByTestAttr, checkProps } from './test/testUtils';
import Input from './Input';
import React from 'react';

const secretWord = 'party';
const setup = (props = { secretWord }) => {
  return shallow(<Input {...props} />);
};

test('render without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-input');
  expect(component.length).toBe(1);
});

test('does not throw warning with expected props', () => {
  const expectedProps = { secretWord };
  checkProps(Input, expectedProps);
});

describe('test controlled input field', () => {
  let mockSetCurrentGuess = jest.fn();
  let wrapper;
  beforeEach(() => {
    mockSetCurrentGuess.mockClear();
    React.useState = jest.fn(() => ['', mockSetCurrentGuess]);

    wrapper = setup();
  });
  test('state updates with value of input box upon change', () => {
    const inputBox = findByTestAttr(wrapper, 'input-box');

    const event = { target: { value: 'train' } };
    inputBox.simulate('change', event);

    expect(mockSetCurrentGuess).toHaveBeenCalledWith('train');
  });
  test('should clear currentGuess input after submit', () => {
    const submitBtn = findByTestAttr(wrapper, 'submit-button');
    submitBtn.simulate('click', { preventDefault() {} });

    expect(mockSetCurrentGuess).toHaveBeenCalledWith('');
  });
});
