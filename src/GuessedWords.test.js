import { findByTestAttr } from './test/testUtils';
import { shallow } from 'enzyme';
import GuessedWords from './GuessedWords';
import { languageStrings } from './helpers/strings';
import React from 'react';
import guessedWordsContext from './context/guessedWordsContext';

const setup = (guessedWords = []) => {
  const mockGuessedWordsContext = jest
    .fn()
    .mockReturnValue([guessedWords, jest.fn()]);
  guessedWordsContext.useGuessedWords = mockGuessedWordsContext;
  return shallow(<GuessedWords />);
};

describe('if there are no words guessed', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup([]);
  });

  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-guessed-words');
    expect(component.length).toBe(1);
  });
  test('renders instructions to guess a word', () => {
    const component = findByTestAttr(wrapper, 'guess-instructions');
    expect(component.text().length).not.toBe(0);
  });
});

describe('if there are words guessed', () => {
  let wrapper;
  const guessedWords = [
    { guessedWord: 'train', letterMatchCount: 1 },
    { guessedWord: 'agile', letterMatchCount: 3 },
    { guessedWord: 'react', letterMatchCount: 5 },
  ];
  beforeEach(() => {
    wrapper = setup(guessedWords);
  });

  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-guessed-words');
    expect(component.length).toBe(1);
  });
  test('renders guessed words section', () => {
    const guessedWordsNode = findByTestAttr(wrapper, 'guessed-words');
    expect(guessedWordsNode.length).toBe(1);
  });
  test('correct number of guessed words', () => {
    const guessedWordsNodes = findByTestAttr(wrapper, 'guessed-word');
    expect(guessedWordsNodes.length).toBe(guessedWords.length);
  });
});

describe('languagePicker', () => {
  test('should correctly renders guess instructions string in english by default', () => {
    const wrapper = setup([]);
    const guessInstructions = findByTestAttr(wrapper, 'guess-instructions');
    expect(guessInstructions.text()).toBe(languageStrings.en.guessPrompt);
  });
  test('should correctly renders guess instructions string in emoji', () => {
    const mockUserContext = jest.fn().mockReturnValue('emoji');
    React.useContext = mockUserContext;
    const wrapper = setup([]);
    const guessInstructions = findByTestAttr(wrapper, 'guess-instructions');
    expect(guessInstructions.text()).toBe(languageStrings.emoji.guessPrompt);
  });
});
