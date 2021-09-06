import PropTypes from 'prop-types';
import React from 'react';

const Input = ({ secretWord }) => {
  const [currentGuess, setCurrentGuess] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: update guessedWords
    // TODO: check against secretWord and update success if needed
    setCurrentGuess('');
  };
  return (
    <div data-test='component-input'>
      <form className='form-inline'>
        <input
          type='text'
          className='mb-2 mx-sm-3'
          placeholder='Enter Guess'
          data-test='input-box'
          value={currentGuess}
          onChange={(e) => setCurrentGuess(e.target.value)}
        />
        <button
          className='btn btn-primary mb-2'
          data-test='submit-button'
          onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

Input.propTypes = {
  secretWord: PropTypes.string.isRequired,
};

export default Input;
