import React from 'react';
import {StyleSheet, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import {BottomTabParamList} from '../../navigation/types';
import {AppBar} from '../../components/AppBar/AppBar';

export const ConversationsScreen: React.FC<
  StackScreenProps<BottomTabParamList, 'Conversations'>
> = () => {
  const render = (): React.ReactElement => {
    return (
      <View style={styles.container}>
        <AppBar title="Messages" />
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
