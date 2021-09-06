import { getLetterMatchCount } from './';

describe('getLetterMatchCount', () => {
  let secretWord = 'party';

  test('returns correct counts when there are no matching', () => {
    const letterMatchCount = getLetterMatchCount('bones', secretWord);
    expect(letterMatchCount).toBe(0);
  });
  test('returns correct counts when there are 3 matching letters', () => {
    const letterMatchCount = getLetterMatchCount('train', secretWord);
    expect(letterMatchCount).toBe(3);
  });
  test('returns correct counts when there are duplicate letters in guessed word', () => {
    const letterMatchCount = getLetterMatchCount('parka', secretWord);
    expect(letterMatchCount).toBe(3);
  });
});
