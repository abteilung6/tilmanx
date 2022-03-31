import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {RootStackParamList} from './types';
import {useAuthentication} from '../hooks/authentication/useAuthentication';
import {WalkthroughScreen} from '../screens/WalkthroughScreen';
import {LoginScreen} from '../screens/LoginScreen';
import {SplashScreen} from '../screens/SplashScreen';
import {SettingsScreen} from '../screens/SettingsScreen';

export const RootStack = createStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  const {isLoggedIn} = useAuthentication();

  const render = (): React.ReactElement => {
    if (isLoggedIn) {
      return renderForAuthorized();
    } else if (isLoggedIn === false) {
      return renderForUnauthorized();
    } else {
      return renderForInitializing();
    }
  };

  const renderForInitializing = (): React.ReactElement => {
    return (
      <RootStack.Navigator
        initialRouteName="Splash"
        screenOptions={{headerShown: false}}>
        <RootStack.Screen name="Splash" component={SplashScreen} />
      </RootStack.Navigator>
    );
  };

  const renderForUnauthorized = (): React.ReactElement => {
    return (
      <RootStack.Navigator
        initialRouteName="Walkthrough"
        screenOptions={{headerShown: false}}>
        <RootStack.Screen name="Walkthrough" component={WalkthroughScreen} />
        <RootStack.Screen name="Login" component={LoginScreen} />
      </RootStack.Navigator>
    );
  };

  const renderForAuthorized = (): React.ReactElement => {
    return (
      <RootStack.Navigator
        initialRouteName="Settings"
        screenOptions={{headerShown: false}}>
        <RootStack.Screen name="Settings" component={SettingsScreen} />
      </RootStack.Navigator>
    );
  };

  return render();
};
