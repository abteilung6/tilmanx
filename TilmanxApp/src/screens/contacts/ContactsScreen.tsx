import React from 'react';
import {StyleSheet, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import {BottomTabParamList} from '../../navigation/types';
import {AppBar} from '../../components/AppBar/AppBar';

export const ContactsScreen: React.FC<
  StackScreenProps<BottomTabParamList, 'Contacts'>
> = () => {
  const render = (): React.ReactElement => {
    return (
      <View style={styles.container}>
        <AppBar title="Contacts" />
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