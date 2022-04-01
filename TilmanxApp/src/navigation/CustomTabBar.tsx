import React from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {View, StyleSheet, Pressable} from 'react-native';
import {SvgProps} from 'react-native-svg';

import MessageOutlineIcon from '../assets/tabs/message-icon-outline.svg';
import ProfileOutlineIcon from '../assets/tabs/profile-icon-outline.svg';
import SettingsOutlineIcon from '../assets/tabs/settings-icon-outline.svg';
import {defaultTheme} from '../styles/theme';

export const CostumTabBar: React.FC<BottomTabBarProps> = ({
  state,
  navigation,
}) => {
  const render = (): React.ReactElement => {
    return (
      <View style={styles.container}>
        <View style={styles.bar}>
          {state.routes.map((route, index) => renderTab(route.name, index))}
        </View>
      </View>
    );
  };

  const renderTab = (routeName: string, index: number): React.ReactElement => {
    return (
      <Pressable
        key={index}
        style={styles.pressable}
        onPress={() => navigation.navigate(routeName)}>
        {getIconFor(routeName)}
      </Pressable>
    );
  };

  const getIconFor = (routeName: string): React.ReactNode => {
    const props: SvgProps = {width: 28, height: 28};
    if (routeName === 'Conversations') {
      return <MessageOutlineIcon width={22} height={22} />;
    } else if (routeName === 'Contacts') {
      return <ProfileOutlineIcon {...props} />;
    } else if (routeName === 'Settings') {
      return <SettingsOutlineIcon {...props} />;
    }
  };

  return render();
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 64,
    marginTop: 36,
    marginBottom: 24,
  },
  bar: {
    borderRadius: 20,
    backgroundColor: defaultTheme.solidColors.lightGray,
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressable: {
    marginHorizontal: 20,
  },
});
