import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {RootNavigator} from './RootNavigator';

export const Navigation: React.FC = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};
