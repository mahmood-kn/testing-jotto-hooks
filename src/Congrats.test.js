import { mount } from 'enzyme';
import Congrats from './Congrats';
import { findByTestAttr } from './test/testUtils';
import languageContext from './context/languageContext';
import successContext from './context/successContext';
import { languageStrings } from './helpers/strings';

const setup = ({ success, language }) => {
  language = language || 'en';
  success = success || false;
  return mount(
    <languageContext.Provider value={language}>
      <successContext.SuccessProvider value={[success, jest.fn()]}>
        <Congrats />
      </successContext.SuccessProvider>
    </languageContext.Provider>
  );
};

describe('languagePicker', () => {
  test('correctly renders congrats string in english', () => {
    const wrapper = setup({ success: true });
    expect(wrapper.text()).toBe(languageStrings.en.congrats);
  });

  test('correctly renders congrats string in emoji', () => {
    const wrapper = setup({ success: true, language: 'emoji' });
    expect(wrapper.text()).toBe(languageStrings.emoji.congrats);
  });
});

test('renders without error', () => {
  const wrapper = setup({});
  const component = findByTestAttr(wrapper, 'component-congrats');
  expect(component.length).toBe(1);
});
test('renders no text when `success` is false', () => {
  const wrapper = setup({ success: false });
  const component = findByTestAttr(wrapper, 'component-congrats');
  expect(component.text()).toBe('');
});
test('renders non-empty  when `success` is true', () => {
  const wrapper = setup({ success: true });
  const message = findByTestAttr(wrapper, 'congrats-message');
  expect(message.text().length).not.toBe(0);
});
