import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {RootStackParamList} from './types';
import {useAuthentication} from '../hooks/authentication/useAuthentication';
import {BottomTabNavigator} from './BottomTabNavigator';
import {WalkthroughScreen} from '../screens/WalkthroughScreen';
import {LoginScreen} from '../screens/LoginScreen';
import {SplashScreen} from '../screens/SplashScreen';
import {SearchContactsScreen} from '../screens/contacts/SearchContactsScreen';
import {ProfileScreen} from '../screens/users/ProfileScreen';
import {ContactRequestsScreen} from '../screens/contacts/ContactRequestsScreen';
import {SignupScreen} from '../screens/SignupScreen';
import {ConversationScreen} from '../screens/conversation/ConversationScreen';

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
        <RootStack.Screen name="Signup" component={SignupScreen} />
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
        <RootStack.Screen
          name="ContactRequests"
          component={ContactRequestsScreen}
        />
        <RootStack.Screen name="Profile" component={ProfileScreen} />
        <RootStack.Screen name="Conversation" component={ConversationScreen} />
      </RootStack.Navigator>
    );
  };

  return render();
};
