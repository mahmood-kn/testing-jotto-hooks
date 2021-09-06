import React from 'react';
import PropTypes from 'prop-types';

const Congrats = ({ success }) => {
  return (
    <div data-test='component-congrats' className='my-4'>
      {success && (
        <span data-test='congrats-message' className='alert alert-success'>
          Congratulations! You guessed the word.
        </span>
      )}
    </div>
  );
};

Congrats.propTypes = {
  success: PropTypes.bool.isRequired,
};

export default Congrats;
