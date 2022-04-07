import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import {RootStackParamList} from '../../navigation/types';
import {
  useUserFriendshipQuery,
  useUserMeQuery,
  useUserQuery,
} from '../../hooks/useUserQuery';
import {
  useAcceptFriendshipMutation,
  useCreateFriendshipMutation,
  useDeclineFriendshipMutation,
  useFriendshipsQuery,
} from '../../hooks/useFriendshipQuery';
import {FriendshipStatus} from '../../models/friendship';
import {AppBar} from '../../components/AppBar/AppBar';
import {Profile} from '../../components/Profile/Profile';
import {Button} from '../../components/Button/Button';

export const ProfileScreen: React.FC<
  StackScreenProps<RootStackParamList, 'Profile'>
> = ({route}) => {
  const userQuery = useUserQuery(route.params.userId);
  const user = userQuery.data;
  const userFriendshipQuery = useUserFriendshipQuery(route.params.userId);
  const userFriendship = userFriendshipQuery.data;
  const userMeQuery = useUserMeQuery();
  const me = userMeQuery.data;
  const friendshipsQuery = useFriendshipsQuery();
  const createFriendshipMutation = useCreateFriendshipMutation({
    onSettled: () => {
      userFriendshipQuery.refetch();
      friendshipsQuery.refetch();
    },
  });
  const acceptFriendshipMutation = useAcceptFriendshipMutation({
    onSettled: () => {
      userFriendshipQuery.refetch();
      friendshipsQuery.refetch();
    },
  });
  const declineFriendshipMutation = useDeclineFriendshipMutation({
    onSettled: () => {
      userFriendshipQuery.refetch();
      friendshipsQuery.refetch();
    },
  });

  const render = (): React.ReactElement => {
    return (
      <View style={styles.container}>
        <AppBar title="Profile" />
        <View style={styles.innerContainer}>
          {renderProfile()}
          {renderActionBar()}
        </View>
      </View>
    );
  };

  const renderProfile = (): React.ReactNode => {
    if (user) {
      return <Profile user={user} />;
    }
  };

  const renderActionBar = (): React.ReactNode => {
    if (user && me && user.id !== me.id) {
      return (
        <View style={styles.actionBar}>
          <View style={styles.action}>
            <Text>Other actions..</Text>
          </View>
          <View style={styles.action}>{renderFriendshipButton()}</View>
        </View>
      );
    }
  };

  const renderFriendshipButton = (): React.ReactNode => {
    if (userFriendship && me) {
      if (userFriendship.status === FriendshipStatus.Accepted) {
        return (
          <Button
            variant="secondary"
            height={40}
            onPress={() => declineFriendshipMutation.mutate(userFriendship.id)}>
            Unfollow
          </Button>
        );
      } else if (userFriendship.status === FriendshipStatus.Offered) {
        if (userFriendship.addressee_id === me.id) {
          return (
            <Button
              variant="secondary"
              height={40}
              onPress={() =>
                acceptFriendshipMutation.mutate(userFriendship.id)
              }>
              Accept
            </Button>
          );
        } else {
          return (
            <Button
              variant="secondary"
              height={40}
              onPress={() =>
                declineFriendshipMutation.mutate(userFriendship.id)
              }>
              Requested
            </Button>
          );
        }
      }
    } else if (userFriendship === null) {
      return (
        <Button
          height={40}
          onPress={() =>
            createFriendshipMutation.mutate({addressee_id: route.params.userId})
          }>
          Follow
        </Button>
      );
    }
  };

  return render();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    marginHorizontal: 25,
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  action: {
    justifyContent: 'center',
  },
});
