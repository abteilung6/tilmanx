import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {useFormik} from 'formik';

import {RootStackParamList} from '../navigation/types';
import {defaultTheme} from '../styles/theme';
import {Button} from '../components/Button/Button';
import {TextInput} from '../components/TextInput/TextInput';
import {loginSchema} from '../lib/schema';
import {useLoginMutation} from '../hooks/useAuthQuery';

export const LoginScreen: React.FC<
  StackScreenProps<RootStackParamList, 'Login'>
> = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: values => loginMutation.mutate(values),
  });
  const loginMutation = useLoginMutation({
    onSuccess: values => console.log(values),
    onError: err => console.log(err),
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
        </View>
        <View style={styles.button}>
          <Button
            disabled={!formik.isValid || !formik.touched}
            onPress={() => formik.handleSubmit()}>
            Log in
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
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formView: {
    flex: 2,
    marginHorizontal: 15,
  },
  textInput: {
    marginVertical: 5,
  },
  button: {
    marginVertical: 5,
  },
});
