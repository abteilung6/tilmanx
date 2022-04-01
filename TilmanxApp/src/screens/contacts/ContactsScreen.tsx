import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import {BottomTabParamList} from '../../navigation/types';
import {defaultTheme} from '../../styles/theme';

export const ContactsScreen: React.FC<
  StackScreenProps<BottomTabParamList, 'Contacts'>
> = () => {
  const render = (): React.ReactElement => {
    return (
      <View style={styles.container}>
        <Text style={[defaultTheme.typography.h3, styles.title]}>Contacts</Text>
      </View>
    );
  };

  return render();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    marginHorizontal: 10,
  },
  title: {
    marginBottom: 10,
  },
});
