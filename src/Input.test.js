import { shallow } from 'enzyme';
import { findByTestAttr, checkProps } from './test/testUtils';
import Input from './Input';

const secretWord = 'party';
const setup = (props = { secretWord }) => {
  return shallow(<Input {...props} />);
};

test('render without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-input');
  expect(component.length).toBe(1);
});

test('does not throw warning with expected props', () => {
  const expectedProps = { secretWord };
  checkProps(Input, expectedProps);
});
