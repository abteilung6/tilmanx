import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {RootStackParamList} from './types';
import {useAuthentication} from '../hooks/authentication/useAuthentication';
import {BottomTabNavigator} from './BottomTabNavigator';
import {WalkthroughScreen} from '../screens/WalkthroughScreen';
import {LoginScreen} from '../screens/LoginScreen';
import {SplashScreen} from '../screens/SplashScreen';
import {SearchContactsScreen} from '../screens/contacts/SearchContactsScreen';

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
        initialRouteName="Root"
        screenOptions={{headerShown: false}}>
        <RootStack.Screen name="Root" component={BottomTabNavigator} />
        <RootStack.Screen
          name="SearchContacts"
          component={SearchContactsScreen}
        />
      </RootStack.Navigator>
    );
  };

  return render();
};
