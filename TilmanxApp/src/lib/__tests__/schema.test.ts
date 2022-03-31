import 'react-native';

import {loginSchema} from '../schema';

describe('loginSchema', () => {
  test('validates correctly', () => {
    expect(loginSchema.isValidSync({})).toEqual(false);
    expect(loginSchema.isValidSync({username: 'foo'})).toEqual(false);
    expect(loginSchema.isValidSync({password: 'foo'})).toEqual(false);
    expect(loginSchema.isValidSync({username: '', password: ''})).toEqual(
      false,
    );
    expect(loginSchema.isValidSync({username: 'foo', password: ''})).toEqual(
      false,
    );
    expect(loginSchema.isValidSync({username: 'foo', password: 'foo'})).toEqual(
      true,
    );
  });
});
