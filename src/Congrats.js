import React from 'react';
import languageContext from './context/languageContext';
import stringsModule from './helpers/strings';
import successContext from './context/successContext';

const Congrats = () => {
  const [success] = successContext.useSuccess();
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

export default Congrats;
