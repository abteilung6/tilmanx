import React from 'react';
import {StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {defaultTheme} from '../../styles/theme';

export interface AvatarProps {}

export const Avatar: React.FC<AvatarProps> = ({}) => {
  const render = (): React.ReactElement => {
    return (
      <View style={styles.container}>
        <Ionicons
          name="person-outline"
          size={22}
          color={defaultTheme.solidColors.white}
        />
      </View>
    );
  };

  return render();
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: 40,
    borderRadius: 40 / 2,
    backgroundColor: defaultTheme.solidColors.line,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
