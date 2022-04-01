import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import {BottomTabParamList} from '../navigation/types';
import {useAuthentication} from '../hooks/authentication/useAuthentication';
import {defaultTheme} from '../styles/theme';
import Logo from '../assets/icon-logout.svg';

export const SettingsScreen: React.FC<
  StackScreenProps<BottomTabParamList, 'Settings'>
> = () => {
  const {logout, loading} = useAuthentication();
  const render = (): React.ReactElement => {
    return (
      <View style={styles.container}>
        <Text style={[defaultTheme.typography.h3, styles.title]}>Settings</Text>
        <Pressable style={styles.pressable} disabled={loading} onPress={logout}>
          <Logo width={24} height={24} fill={'red'} color="red" />
          <View style={styles.textView}>
            <Text style={[defaultTheme.typography.body1]}>Sign Out</Text>
          </View>
        </Pressable>
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
  pressable: {
    flexDirection: 'row',
  },
  textView: {
    justifyContent: 'center',
    marginHorizontal: 10,
  },
});
