import React from 'react';
import PropTypes from 'prop-types';

const GuessedWords = (props) => {
  return (
    <div data-test='component-guessed-words'>
      {props.guessedWords.length === 0 ? (
        <span data-test='guess-instructions'>
          Try to guess the secret word!
        </span>
      ) : (
        <div data-test='guessed-words'>
          <h3>Guessed Words</h3>
          <table className='table table-sm'>
            <thead className='table-info'>
              <tr>
                <th>#</th>
                <th>Guess</th>
                <th>Matched Letters</th>
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
