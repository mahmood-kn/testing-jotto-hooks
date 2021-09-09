import React from 'react';
import PropTypes from 'prop-types';
import languageContext from './context/languageContext';
import stringsModule from './helpers/strings';

const Congrats = ({ success }) => {
  const language = React.useContext(languageContext);
  return (
    <div data-test='component-congrats' className='my-4'>
      {success && (
        <span data-test='congrats-message' className='alert alert-success'>
          {stringsModule.getStringByLanguage(language, 'congrats')}
        </span>
      )}
    </div>
  );
};

Congrats.propTypes = {
  success: PropTypes.bool.isRequired,
};

export default Congrats;
