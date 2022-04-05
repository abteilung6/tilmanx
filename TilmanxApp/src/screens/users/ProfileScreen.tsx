import React from 'react';
import {StyleSheet, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import {RootStackParamList} from '../../navigation/types';
import {useUserQuery} from '../../hooks/useUserQuery';
import {AppBar} from '../../components/AppBar/AppBar';
import {Profile} from '../../components/Profile/Profile';

export const ProfileScreen: React.FC<
  StackScreenProps<RootStackParamList, 'Profile'>
> = ({route}) => {
  const userQuery = useUserQuery(route.params.userId);
  const user = userQuery.data;

  const render = (): React.ReactElement => {
    return (
      <View style={styles.container}>
        <AppBar title="Profile" />
        <View style={styles.innerContainer}>{renderProfile()}</View>
      </View>
    );
  };

  const renderProfile = (): React.ReactNode => {
    if (user) {
      return <Profile user={user} />;
    }
  };

  return render();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    marginHorizontal: 25,
  },
});
