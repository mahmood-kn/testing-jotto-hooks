import { shallow, mount } from 'enzyme';
import { findByTestAttr, checkProps } from './test/testUtils';
import Input from './Input';
import languageContext from './context/languageContext';
import { languageStrings } from './helpers/strings';
import React from 'react';

const secretWord = 'party';
const setup = ({ secretWord, language }) => {
  language = language || 'en';
  secretWord = secretWord || 'party';
  return mount(
    <languageContext.Provider value={language}>
      <Input secretWord={secretWord} />
    </languageContext.Provider>
  );
};

describe('languagePicker', () => {
  test('correctly renders submit string in english', () => {
    const wrapper = setup({});
    const submitBtn = findByTestAttr(wrapper, 'submit-button');
    expect(submitBtn.text()).toBe(languageStrings.en.submit);
  });
  test('correctly renders submit string in emoji', () => {
    const wrapper = setup({ language: 'emoji' });
    const submitBtn = findByTestAttr(wrapper, 'submit-button');
    expect(submitBtn.text()).toBe(languageStrings.emoji.submit);
  });
});

test('render without error', () => {
  const wrapper = setup({});
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

    wrapper = setup({});
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
