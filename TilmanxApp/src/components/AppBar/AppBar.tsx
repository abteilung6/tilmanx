import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {defaultTheme} from '../../styles/theme';

export interface AppBarProps {
  title: string;
}

export const AppBar: React.FC<AppBarProps> = ({title}) => {
  const render = (): React.ReactElement => {
    return (
      <View style={styles.container}>
        <Text style={[defaultTheme.typography.h3, styles.title]}>{title}</Text>
      </View>
    );
  };

  return render();
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginBottom: 15,
    marginHorizontal: 25,
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
  },
});
