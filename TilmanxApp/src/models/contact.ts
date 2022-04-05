import {Friendship, FriendshipStatus} from './friendship';
import {User} from './user';

export interface ContactProperties {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  friendship_id: number;
}

export class Contact {
  public readonly id: number;
  public readonly username: string;
  public readonly first_name: string;
  public readonly last_name: string;
  public readonly friendship_id: number;

  constructor(props: ContactProperties) {
    this.id = props.id;
    this.username = props.username;
    this.first_name = props.first_name;
    this.last_name = props.last_name;
    this.friendship_id = props.friendship_id;
  }

  /**
   * Turns friendships into contacts with following requirements:
   * - `FriendshipStatus` must be `Accepted`
   * - `userId` must be the `requester_id` or `addressee_id`
   */
  public static fromFriendships(
    userId: number,
    friendships: ReadonlyArray<Friendship>,
  ): ReadonlyArray<Contact> {
    const acceptedFriendships = friendships.filter(
      friendship => friendship.status === FriendshipStatus.Accepted,
    );
    const relatedFriendships = acceptedFriendships.filter(friendship =>
      [friendship.requester_id, friendship.addressee_id].includes(userId),
    );
    return relatedFriendships.map(friendship =>
      this.getContact(userId, friendship),
    );
  }

  private static getContact(userId: number, friendship: Friendship): Contact {
    if (userId === friendship.addressee_id) {
      return new Contact({
        id: friendship.requester_id,
        username: friendship.requester_username,
        first_name: friendship.requester_first_name,
        last_name: friendship.requester_last_name,
        friendship_id: friendship.id,
      });
    } else {
      // This condition relies on the `getContact` method.
      return new Contact({
        id: friendship.addressee_id,
        username: friendship.addressee_username,
        first_name: friendship.addressee_first_name,
        last_name: friendship.addressee_last_name,
        friendship_id: friendship.id,
      });
    }
  }

  /**
   * Turns users into contacts.
   */
  public static fromUsers(users: ReadonlyArray<User>): ReadonlyArray<Contact> {
    return users.map(
      user =>
        new Contact({
          id: user.id,
          username: user.username,
          first_name: user.first_name,
          last_name: user.last_name,
          friendship_id: NaN,
        }),
    );
  }
}
