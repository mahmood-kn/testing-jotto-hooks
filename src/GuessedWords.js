import React from 'react';
import languageContext from './context/languageContext';
import stringsModule from './helpers/strings';
import guessedWordsContext from './context/guessedWordsContext';

const GuessedWords = () => {
  const language = React.useContext(languageContext);
  const [guessedWords] = guessedWordsContext.useGuessedWords();
  return (
    <div data-test='component-guessed-words'>
      {guessedWords.length === 0 ? (
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
              {guessedWords.map((word, i) => (
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

export default GuessedWords;
