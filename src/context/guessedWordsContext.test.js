import guessedWordsContext from './guessedWordsContext';
import React from 'react';
import { shallow, mount } from 'enzyme';

const FunctionalComponent = () => {
  guessedWordsContext.useGuessedWords();
  return <div />;
};

test('should throw error for using guessedWords context outside provider', () => {
  expect(() => {
    shallow(<FunctionalComponent />);
  }).toThrow('useGuessedWords must be used within a GuessedWordsProvider');
});

test('should not throw error for using guessedWords context with provider', () => {
  expect(() => {
    mount(
      <guessedWordsContext.GuessedWordsProvider>
        <FunctionalComponent />
      </guessedWordsContext.GuessedWordsProvider>
    );
  }).not.toThrow('useGuessedWords must be used within a GuessedWordsProvider');
});
