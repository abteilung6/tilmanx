import React from 'react';
import {StyleSheet, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import {RootStackParamList} from '../../navigation/types';
import {AppBar} from '../../components/AppBar/AppBar';

export const ConversationScreen: React.FC<
  StackScreenProps<RootStackParamList, 'Conversation'>
> = ({route}) => {
  console.log(route.params.conversationId);

  const render = (): React.ReactElement => {
    return (
      <View style={styles.container}>
        <AppBar title="Conversation" />
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
