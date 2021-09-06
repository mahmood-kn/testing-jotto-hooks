import './App.css';
import React from 'react';
import hookActions from './store/actions/hookActions';

function reducer(state, action) {
  switch (action.type) {
    case 'setSecretWord':
      return { ...state, secretWord: action.payload };

    default:
      throw new Error(`Invalid action type ${action.type}`);
  }
}

function App() {
  const [state, dispatch] = React.useReducer(reducer, { secretWord: null });

  const setSecretWord = (secretWord) =>
    dispatch({ type: 'setSecretWord', payload: secretWord });
  React.useEffect(() => {
    hookActions.getSecretWord(setSecretWord);
  }, []);
  return <div className='App' data-test='component-app'></div>;
}

export default App;
