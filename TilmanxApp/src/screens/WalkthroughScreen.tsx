import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import {RootStackParamList} from '../navigation/types';
import {Button} from '../components/Button/Button';
import {defaultTheme} from '../styles/theme';

export const WalkthroughScreen: React.FC<
  StackScreenProps<RootStackParamList, 'Walkthrough'>
> = ({navigation}) => {
  const render = (): React.ReactElement => {
    return (
      <View style={styles.container}>
        {renderTitle()}
        {renderButtons()}
      </View>
    );
  };

  const renderTitle = (): React.ReactElement => {
    return (
      <View style={styles.titleView}>
        <Text style={defaultTheme.typography.h1}>Hi there!</Text>
        <Text style={defaultTheme.typography.body1}>Welcome to tilmanx</Text>
      </View>
    );
  };

  const renderButtons = (): React.ReactElement => {
    return (
      <View style={styles.buttonsView}>
        <View style={styles.button}>
          <Button variant="secondary">Sign up</Button>
        </View>
        <View style={styles.button}>
          <Button onPress={() => navigation.navigate('Login')}>Login</Button>
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
  buttonsView: {
    flex: 1,
  },
  button: {
    marginVertical: 5,
  },
});
