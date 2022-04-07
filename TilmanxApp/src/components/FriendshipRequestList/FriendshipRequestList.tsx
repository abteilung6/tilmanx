import React from 'react';
import {FlatList, FlatListProps} from 'react-native';

import {Friendship} from '../../models/friendship';
import {FriendshipRequestListEntry} from './FriendshipRequestListEntry';

export type FriendshipRequestListProps = Omit<
  FlatListProps<Friendship>,
  'data' | 'renderItem'
> & {
  friendshipRequests: ReadonlyArray<Friendship>;
  onAccept?: (friendshipRequest: Friendship) => void;
  onDecline?: (friendshipRequest: Friendship) => void;
};

export const FriendshipRequestList: React.FC<FriendshipRequestListProps> = ({
  friendshipRequests,
  onAccept,
  onDecline,
  ...props
}) => {
  const render = (): React.ReactElement => {
    return (
      <FlatList
        data={friendshipRequests}
        renderItem={({item, index}) => (
          <FriendshipRequestListEntry
            key={index}
            friendshipRequest={item}
            onAccept={onAccept}
            onDecline={onDecline}
          />
        )}
        {...props}
      />
    );
  };

  return render();
};
