import React from 'react';
import {StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {defaultTheme} from '../../styles/theme';

export interface AvatarProps {
  /**
   * Size of icon
   * @default "20"
   */
  size?: number;
}

export const Avatar: React.FC<AvatarProps> = ({size = 20}) => {
  const render = (): React.ReactElement => {
    return (
      <View
        style={[
          styles.container,
          {height: size * 2, width: size * 2, borderRadius: size},
        ]}>
        <Ionicons
          name="person-outline"
          size={size}
          color={defaultTheme.solidColors.white}
        />
      </View>
    );
  };

  return render();
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultTheme.solidColors.line,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
