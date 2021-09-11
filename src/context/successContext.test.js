import React from 'react';
import { shallow, mount } from 'enzyme';
import successContext from './successContext';

const FunctionalComponent = () => {
  successContext.useSuccess();
  return <div />;
};

test('should throw error for using success context outside provider', () => {
  expect(() => {
    shallow(<FunctionalComponent />);
  }).toThrow('useSuccess must be used within a SuccessProvider');
});

test('should not throw error for using success context with provider', () => {
  expect(() => {
    mount(
      <successContext.SuccessProvider>
        <FunctionalComponent />
      </successContext.SuccessProvider>
    );
  }).not.toThrow('useSuccess must be used within a SuccessProvider');
});
