import React from 'react';
import { mount } from 'enzyme';
import { findByTestAttr } from './test/testUtils';
import successContext from './context/successContext';
import Input from './Input';
import guessedWordsContext from './context/guessedWordsContext';
import GuessedWords from './GuessedWords';

function setup(guessedWordsStrings = [], secretWord = 'party') {
  const wrapper = mount(
    <guessedWordsContext.GuessedWordsProvider>
      <successContext.SuccessProvider>
        <Input secretWord={secretWord} />
        <GuessedWords />
      </successContext.SuccessProvider>
    </guessedWordsContext.GuessedWordsProvider>
  );
  const inputBox = findByTestAttr(wrapper, 'input-box');
  const submitBtn = findByTestAttr(wrapper, 'submit-button');

  guessedWordsStrings.forEach((word) => {
    const mockEvent = { target: { value: word } };
    inputBox.simulate('change', mockEvent);
    submitBtn.simulate('click');
  });

  return [wrapper, inputBox, submitBtn];
}

describe('test word guesses', () => {
  let wrapper;
  let inputBox;
  let submitBtn;

  describe('non-empty guessedWords', () => {
    beforeEach(() => {
      [wrapper, inputBox, submitBtn] = setup(['agile'], 'party');
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
      test('GuessedWords table row count reflects updated guess', () => {
        const guessedWordsTableRows = findByTestAttr(wrapper, 'guessed-word');
        expect(guessedWordsTableRows.length).toBe(2);
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
      test('GuessedWords table row count reflects updated guess', () => {
        const guessedWordsTableRows = findByTestAttr(wrapper, 'guessed-word');
        expect(guessedWordsTableRows.length).toBe(2);
      });
    });
  });
  describe('empty guessedWords', () => {
    beforeEach(() => {
      [wrapper, inputBox, submitBtn] = setup([], 'party');
    });
    test('GuessedWords table row count reflects updated guess', () => {
      const mockEvent = { target: { value: 'train' } };
      inputBox.simulate('change', mockEvent);
      submitBtn.simulate('click');
      const guessedWordsTableRows = findByTestAttr(wrapper, 'guessed-word');
      expect(guessedWordsTableRows.length).toBe(1);
    });
  });
});
