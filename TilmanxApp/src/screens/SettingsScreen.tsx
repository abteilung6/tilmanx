import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

import {BottomTabParamList} from '../navigation/types';
import {useAuthentication} from '../hooks/authentication/useAuthentication';
import {defaultTheme} from '../styles/theme';
import {AppBar} from '../components/AppBar/AppBar';

export const SettingsScreen: React.FC<
  StackScreenProps<BottomTabParamList, 'Settings'>
> = () => {
  const {logout, loading} = useAuthentication();
  const render = (): React.ReactElement => {
    return (
      <View style={styles.container}>
        <AppBar title="Settings" />
        <View style={styles.list}>
          <Pressable
            style={({pressed}) => [
              styles.pressable,
              {opacity: pressed ? 0.5 : 1},
            ]}
            disabled={loading}
            onPress={logout}>
            <AntDesignIcon name="logout" size={22} color="red" />
            <Text style={[defaultTheme.typography.body1, styles.text]}>
              Sign Out
            </Text>
          </Pressable>
        </View>
      </View>
    );
  };

  return render();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    marginHorizontal: 25,
  },
  pressable: {
    flexDirection: 'row',
  },
  text: {
    color: defaultTheme.solidColors.red,
    marginLeft: 10,
  },
});
