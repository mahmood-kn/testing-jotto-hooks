import React from 'react';

const guessedWordsContext = React.createContext();

function useGuessedWords() {
  const context = React.useContext(guessedWordsContext);
  if (!context) {
    throw new Error(
      'useGuessedWords must be used within a GuessedWordsProvider'
    );
  }
  return context;
}

function GuessedWordsProvider(props) {
  const [guessedWords, setGuessedWords] = React.useState([]);
  const value = React.useMemo(
    () => [guessedWords, setGuessedWords],
    [guessedWords]
  );

  return <guessedWordsContext.Provider value={value} {...props} />;
}

const exportObj = {
  useGuessedWords,
  GuessedWordsProvider,
};

export default exportObj;
