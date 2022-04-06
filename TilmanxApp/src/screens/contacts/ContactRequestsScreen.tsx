import React from 'react';
import {StyleSheet, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import {RootStackParamList} from '../../navigation/types';

import {
  useAcceptFriendshipMutation,
  useFriendshipsQuery,
} from '../../hooks/useFriendshipQuery';
import {useUserMeQuery} from '../../hooks/useUserQuery';
import {Friendship} from '../../models/friendship';
import {AppBar} from '../../components/AppBar/AppBar';
import {FriendshipRequestList} from '../../components/FriendshipRequestList/FriendshipRequestList';

export const ContactRequestsScreen: React.FC<
  StackScreenProps<RootStackParamList, 'ContactRequests'>
> = () => {
  const friendshipsQuery = useFriendshipsQuery();
  const friendships = friendshipsQuery.data || [];
  const userMeQuery = useUserMeQuery();
  const user = userMeQuery.data;
  const friendshipRequests = Friendship.getFriendshipRequestsFor(
    friendships,
    user ? user.id : NaN,
  );
  const acceptFriendshipMutation = useAcceptFriendshipMutation({
    onSettled: () => friendshipsQuery.refetch(),
  });

  const render = (): React.ReactElement => {
    return (
      <View style={styles.container}>
        <AppBar title="Requests" />
        {renderFriendshipRequests()}
      </View>
    );
  };

  const renderFriendshipRequests = (): React.ReactElement => {
    return (
      <View style={styles.requests}>
        <FriendshipRequestList
          friendshipRequests={friendshipRequests}
          onAccept={friendship =>
            acceptFriendshipMutation.mutate(friendship.id)
          }
        />
      </View>
    );
  };

  return render();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  requests: {
    marginHorizontal: 25,
  },
});
