import React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';

import {RootNavigator} from './RootNavigator';

const NavigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

export const Navigation: React.FC = () => {
  return (
    <NavigationContainer theme={NavigationTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
};
