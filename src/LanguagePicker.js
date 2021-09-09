import React from 'react';
import PropTypes from 'prop-types';

const LanguagePicker = ({ setLanguage }) => {
  const languages = [
    { code: 'en', symbol: '🤘🏻' },
    { code: 'emoji', symbol: '😊' },
  ];
  return (
    <div data-test='component-language-picker'>
      {languages.map((lang) => (
        <span
          onClick={() => setLanguage(lang.code)}
          key={lang.code}
          data-test='language-icon'>
          {lang.symbol}
        </span>
      ))}
    </div>
  );
};

LanguagePicker.propTypes = {
  setLanguage: PropTypes.func.isRequired,
};

export default LanguagePicker;
