import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import {RootStackParamList} from '../navigation/types';

export const SplashScreen: React.FC<
  StackScreenProps<RootStackParamList, 'Splash'>
> = () => {
  const render = (): React.ReactElement => {
    return <View style={styles.container}>{renderActivityIndicator()}</View>;
  };

  const renderActivityIndicator = (): React.ReactElement => {
    return <ActivityIndicator size="large" />;
  };

  return render();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
