import './App.css';
import React from 'react';
import hookActions from './actions/hookActions';
import Input from './Input';
import languageContext from './context/languageContext';
import LanguagePicker from './LanguagePicker';

function reducer(state, action) {
  switch (action.type) {
    case 'setSecretWord':
      return { ...state, secretWord: action.payload };
    case 'setLanguage':
      return { ...state, language: action.payload };
    default:
      throw new Error(`Invalid action type ${action.type}`);
  }
}

function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    secretWord: null,
    language: 'en',
  });

  const setSecretWord = (secretWord) =>
    dispatch({ type: 'setSecretWord', payload: secretWord });
  const setLanguage = (language) =>
    dispatch({ type: 'setLanguage', payload: language });
  React.useEffect(() => {
    hookActions.getSecretWord(setSecretWord);
  }, []);
  return (
    <>
      {state.secretWord ? (
        <languageContext.Provider value={state.language}>
          <div className='App container' data-test='component-app'>
            <LanguagePicker setLanguage={setLanguage} />
            <Input secretWord={state.secretWord} />
          </div>
        </languageContext.Provider>
      ) : (
        <div className='container' data-test='spinner'>
          <div className='spinner-border' role='status'>
            <span className='sr-only'></span>
          </div>
          <p>Loading secret word</p>
        </div>
      )}
    </>
  );
}

export default App;
