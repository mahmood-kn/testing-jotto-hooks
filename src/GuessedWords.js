import React from 'react';
import PropTypes from 'prop-types';
import languageContext from './context/languageContext';
import stringsModule from './helpers/strings';

const GuessedWords = (props) => {
  const language = React.useContext(languageContext);
  return (
    <div data-test='component-guessed-words'>
      {props.guessedWords.length === 0 ? (
        <span data-test='guess-instructions'>
          {stringsModule.getStringByLanguage(language, 'guessPrompt')}
        </span>
      ) : (
        <div data-test='guessed-words'>
          <h3>{stringsModule.getStringByLanguage(language, 'guessedWords')}</h3>
          <table className='table table-sm'>
            <thead className='table-info'>
              <tr>
                <th>#</th>
                <th>
                  {stringsModule.getStringByLanguage(
                    language,
                    'guessColumnHeader'
                  )}
                </th>
                <th>
                  {stringsModule.getStringByLanguage(
                    language,
                    'matchingLettersColumnHeader'
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              {props.guessedWords.map((word, i) => (
                <tr key={i} data-test='guessed-word'>
                  <td>{i + 1}</td>
                  <td>{word.guessedWord}</td>
                  <td>{word.letterMatchCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

GuessedWords.propTypes = {
  guessedWords: PropTypes.arrayOf(
    PropTypes.shape({
      guessedWord: PropTypes.string,
      letterMatchCount: PropTypes.number,
    })
  ).isRequired,
};

export default GuessedWords;
