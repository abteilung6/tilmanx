import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {RootStackParamList} from './types';
import {WalkthroughScreen} from '../screens/WalkthroughScreen';
import {LoginScreen} from '../screens/LoginScreen';

export const RootStack = createStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  const render = (): React.ReactElement => {
    return (
      <RootStack.Navigator
        initialRouteName="Walkthrough"
        screenOptions={{headerShown: false}}>
        <RootStack.Screen name="Walkthrough" component={WalkthroughScreen} />
        <RootStack.Screen name="Login" component={LoginScreen} />
      </RootStack.Navigator>
    );
  };

  return render();
};
