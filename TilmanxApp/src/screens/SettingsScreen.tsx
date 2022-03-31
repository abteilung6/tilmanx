import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import {RootStackParamList} from '../navigation/types';

export const SettingsScreen: React.FC<
  StackScreenProps<RootStackParamList, 'Settings'>
> = () => {
  const render = (): React.ReactElement => {
    return (
      <View style={styles.container}>
        <Text>Settings</Text>
      </View>
    );
  };

  return render();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
