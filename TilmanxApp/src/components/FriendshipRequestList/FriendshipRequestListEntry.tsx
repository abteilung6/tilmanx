import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Avatar} from '../Avatar/Avatar';
import {defaultTheme} from '../../styles/theme';
import {Friendship} from '../../models/friendship';

export interface FriendshipRequestListEntryProps {
  friendshipRequest: Friendship;
  onAccept?: (friendshipRequest: Friendship) => void;
  onDecline?: (friendshipRequest: Friendship) => void;
}

export const FriendshipRequestListEntry: React.FC<
  FriendshipRequestListEntryProps
> = ({friendshipRequest, onAccept, onDecline}) => {
  const render = (): React.ReactElement => {
    return (
      <View style={styles.container}>
        <View style={styles.leftView}>
          <Avatar />
          <Text
            style={[
              defaultTheme.typography.body2,
              styles.text,
            ]}>{`${friendshipRequest.requester_username} ${friendshipRequest.requester_last_name}`}</Text>
        </View>
        <View style={styles.righView}>
          <Ionicons
            name="close"
            size={24}
            color={defaultTheme.solidColors.gray}
            style={styles.closeIcon}
            onPress={() => onDecline && onDecline(friendshipRequest)}
          />
          <Ionicons
            name="checkmark"
            size={24}
            color={defaultTheme.solidColors.gray}
            onPress={() => onAccept && onAccept(friendshipRequest)}
          />
        </View>
      </View>
    );
  };

  return render();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  leftView: {
    flexDirection: 'row',
  },
  text: {
    alignSelf: 'center',
    marginLeft: 16,
  },
  righView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeIcon: {
    marginHorizontal: 10,
  },
});
