import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {useFormik} from 'formik';

import {RootStackParamList} from '../navigation/types';
import {defaultTheme} from '../styles/theme';
import {registerSchema} from '../lib/schema';
import {useAuthentication} from '../hooks/authentication/useAuthentication';
import {useRegisterMutation} from '../hooks/useAuthQuery';
import {TextInput} from '../components/TextInput/TextInput';
import {Button} from '../components/Button/Button';

export const SignupScreen: React.FC<
  StackScreenProps<RootStackParamList, 'Signup'>
> = () => {
  const {login, loading} = useAuthentication();
  const registerMutation = useRegisterMutation({
    onSuccess: (_response, request) =>
      login({username: request.username, password: request.password}),
  });
  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      password: '',
      password2: '',
    },
    validationSchema: registerSchema,
    onSubmit: values => registerMutation.mutate(values),
  });

  const render = (): React.ReactElement => {
    return (
      <View style={styles.container}>
        {renderTitle()}
        {renderForm()}
      </View>
    );
  };

  const renderTitle = (): React.ReactElement => {
    return (
      <View style={styles.titleView}>
        <Text style={defaultTheme.typography.h1}>Welcome!</Text>
        <Text style={defaultTheme.typography.body1}>Just one step...</Text>
      </View>
    );
  };

  const renderForm = (): React.ReactElement => {
    return (
      <View style={styles.formView}>
        <View>
          {formik.errors.first_name && formik.touched.first_name && (
            <Text style={{color: defaultTheme.solidColors.red}}>
              {formik.errors.first_name}
            </Text>
          )}
          <TextInput
            placeholder="Firstname"
            style={styles.textInput}
            value={formik.values.first_name}
            onChangeText={formik.handleChange('first_name')}
            onBlur={formik.handleBlur('first_name')}
          />
          {formik.errors.last_name && formik.touched.last_name && (
            <Text style={{color: defaultTheme.solidColors.red}}>
              {formik.errors.last_name}
            </Text>
          )}
          <TextInput
            placeholder="Lastname"
            style={styles.textInput}
            value={formik.values.last_name}
            onChangeText={formik.handleChange('last_name')}
            onBlur={formik.handleBlur('last_name')}
          />
          {formik.errors.username && formik.touched.username && (
            <Text style={{color: defaultTheme.solidColors.red}}>
              {formik.errors.username}
            </Text>
          )}
          <TextInput
            placeholder="Username"
            style={styles.textInput}
            value={formik.values.username}
            onChangeText={formik.handleChange('username')}
            onBlur={formik.handleBlur('username')}
          />
          {formik.errors.email && formik.touched.email && (
            <Text style={{color: defaultTheme.solidColors.red}}>
              {formik.errors.email}
            </Text>
          )}
          <TextInput
            placeholder="Email"
            style={styles.textInput}
            value={formik.values.email}
            onChangeText={formik.handleChange('email')}
            onBlur={formik.handleBlur('email')}
          />
          {formik.errors.password && formik.touched.password && (
            <Text style={{color: defaultTheme.solidColors.red}}>
              {formik.errors.password}
            </Text>
          )}
          <TextInput
            placeholder="Password"
            secureTextEntry
            style={styles.textInput}
            value={formik.values.password}
            onChangeText={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
          />
          {formik.errors.password2 && formik.touched.password2 && (
            <Text style={{color: defaultTheme.solidColors.red}}>
              {formik.errors.password2}
            </Text>
          )}
          <TextInput
            placeholder="Password (again)"
            secureTextEntry
            style={styles.textInput}
            value={formik.values.password2}
            onChangeText={formik.handleChange('password2')}
            onBlur={formik.handleBlur('password2')}
          />
        </View>
        <View style={styles.button}>
          <Button
            disabled={
              !formik.isValid ||
              !formik.touched ||
              registerMutation.isLoading ||
              loading
            }
            onPress={() => formik.handleSubmit()}>
            Sign up
          </Button>
        </View>
      </View>
    );
  };

  return render();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
  },
  titleView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formView: {
    flex: 3,
    marginHorizontal: 15,
  },
  textInput: {
    marginVertical: 5,
  },
  button: {
    marginVertical: 5,
  },
});
