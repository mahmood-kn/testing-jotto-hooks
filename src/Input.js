import PropTypes from 'prop-types';
import React from 'react';
import languageContext from './context/languageContext';
import stringsModule from './helpers/strings';
import successContext from './context/successContext';
import guessedWordsContext from './context/guessedWordsContext';
import { getLetterMatchCount } from './helpers';

const Input = ({ secretWord }) => {
  const [currentGuess, setCurrentGuess] = React.useState('');
  const language = React.useContext(languageContext);
  const [success, setSuccess] = successContext.useSuccess();
  const [guessedWords, setGuessedWords] = guessedWordsContext.useGuessedWords();
  const handleSubmit = (e) => {
    e.preventDefault();
    //  update guessedWords
    const letterMatchCount = getLetterMatchCount(currentGuess, secretWord);
    const newGuessedWords = [
      ...guessedWords,
      { guessedWord: currentGuess, letterMatchCount },
    ];
    setGuessedWords(newGuessedWords);
    // TODO: check against secretWord and update success if needed
    if (currentGuess === secretWord) {
      setSuccess(true);
    }
    setCurrentGuess('');
  };
  if (success) {
    return null;
  }
  return (
    <div data-test='component-input'>
      <form className='form-inline'>
        <span>{secretWord}</span>
        <input
          type='text'
          className='mb-2 mx-sm-3'
          placeholder={stringsModule.getStringByLanguage(
            language,
            'guessInputPlaceholder'
          )}
          data-test='input-box'
          value={currentGuess}
          onChange={(e) => setCurrentGuess(e.target.value)}
        />
        <button
          className='btn btn-primary mb-2'
          data-test='submit-button'
          onClick={handleSubmit}>
          {stringsModule.getStringByLanguage(language, 'submit')}
        </button>
      </form>
    </div>
  );
};

Input.propTypes = {
  secretWord: PropTypes.string.isRequired,
};

export default Input;
