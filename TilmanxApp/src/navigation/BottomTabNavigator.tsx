import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {BottomTabParamList} from './types';
import {SettingsScreen} from '../screens/SettingsScreen';
import {ContactsScreen} from '../screens/contacts/ContactsScreen';
import {ConversationsScreen} from '../screens/conversation/ConversationsScreen';
import {CostumTabBar} from './CustomTabBar';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export const BottomTabNavigator: React.FC = () => {
  const render = (): React.ReactElement => {
    return (
      <BottomTab.Navigator
        initialRouteName="Conversations"
        screenOptions={{headerShown: false}}
        tabBar={props => <CostumTabBar {...props} />}>
        <BottomTab.Screen
          name="Conversations"
          component={ConversationsScreen}
        />
        <BottomTab.Screen name="Contacts" component={ContactsScreen} />
        <BottomTab.Screen name="Settings" component={SettingsScreen} />
      </BottomTab.Navigator>
    );
  };

  return render();
};
