import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {User} from '../../models/user';
import {defaultTheme} from '../../styles/theme';
import {Avatar} from '../Avatar/Avatar';

export interface ProfileProps {
  user: User;
}

export const Profile: React.FC<ProfileProps> = ({user}) => {
  const render = (): React.ReactElement => {
    return (
      <View style={styles.container}>
        <Avatar size={24} />
        <View style={styles.textView}>
          <Text style={[defaultTheme.typography.body2, styles.title]}>
            {`${user.first_name} ${user.last_name}`}
          </Text>
          <Text style={defaultTheme.typography.subtitle2}>{user.username}</Text>
        </View>
      </View>
    );
  };

  return render();
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  textView: {
    marginLeft: 16,
  },
  title: {
    color: defaultTheme.solidColors.black,
  },
});
