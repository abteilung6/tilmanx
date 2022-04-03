import React from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {View, StyleSheet, Pressable} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {IconProps} from 'react-native-vector-icons/Icon';

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
    const isFocused = state.index === index;
    return (
      <Pressable
        key={index}
        style={styles.pressable}
        onPress={() => navigation.navigate(routeName)}>
        {getIconFor(routeName, isFocused)}
      </Pressable>
    );
  };

  const getIconFor = (
    routeName: string,
    isFocused: boolean,
  ): React.ReactNode => {
    const props: Pick<IconProps, 'size'> = {size: 32};
    if (isFocused) {
      if (routeName === 'Conversations') {
        return <Ionicons name="chatbubbles-sharp" color="black" {...props} />;
      } else if (routeName === 'Contacts') {
        return <Ionicons name="people-sharp" color="black" {...props} />;
      } else if (routeName === 'Settings') {
        return <Ionicons name="settings-sharp" color="black" {...props} />;
      }
    } else {
      if (routeName === 'Conversations') {
        return <Ionicons name="chatbubbles-outline" {...props} />;
      } else if (routeName === 'Contacts') {
        return <Ionicons name="people-outline" {...props} />;
      } else if (routeName === 'Settings') {
        return <Ionicons name="settings-outline" {...props} />;
      }
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pressable: {
    marginHorizontal: 20,
  },
});
