import 'react-native';

import {loginSchema, registerSchema} from '../schema';

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

describe('registerSchema', () => {
  const data = {
    first_name: 'Firstname',
    last_name: 'Lastname',
    username: 'username',
    email: 'username@mail.com',
    password: 'strong_password',
    password2: 'strong_password',
  };

  test('validates correctly', () => {
    expect(registerSchema.isValidSync(data)).toEqual(true);
    expect(registerSchema.isValidSync({})).toEqual(false);
    expect(registerSchema.isValidSync({...data, email: 'invalid'})).toEqual(
      false,
    );
    expect(
      registerSchema.isValidSync({
        ...data,
        password: 'short',
        password2: 'short',
      }),
    ).toEqual(false);
    expect(
      registerSchema.isValidSync({...data, password2: 'different123'}),
    ).toEqual(false);
  });
});
