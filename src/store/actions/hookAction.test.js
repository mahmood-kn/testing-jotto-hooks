import moxios from 'moxios';
import { getSecretWord } from './hookActions';

describe('moxios test', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  test('calls the getSecretWord callback on axios response', async () => {
    const secretWord = 'party';
    moxios.wait(() => {
      const req = moxios.requests.mostRecent();
      req.respondWith({
        status: 200,
        response: secretWord,
      });
    });
    const mockSecretWord = jest.fn();
    await getSecretWord(mockSecretWord);

    expect(mockSecretWord).toHaveBeenCalledWith(secretWord);
  });
});
