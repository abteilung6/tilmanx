import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import {RootStackParamList} from '../navigation/types';
import {defaultTheme} from '../styles/theme';
import {Button} from '../components/Button/Button';
import {TextInput} from '../components/TextInput/TextInput';

export const LoginScreen: React.FC<
  StackScreenProps<RootStackParamList, 'Login'>
> = () => {
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
          <TextInput placeholder="Username" style={styles.textInput} />
          <TextInput
            placeholder="Password"
            secureTextEntry
            style={styles.textInput}
          />
        </View>
        <View style={styles.button}>
          <Button>Log in</Button>
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
