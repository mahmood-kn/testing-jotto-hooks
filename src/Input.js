import PropTypes from 'prop-types';
import React from 'react';

const Input = ({ secretWord }) => {
  const [currentGuess, setCurrentGuess] = React.useState('');
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
        <button className='btn btn-primary mb-2' data-test='submit-button'>
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
