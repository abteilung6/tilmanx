import {GenericModelApi} from '../lib/baseApi';
import {FriendshipProperties} from '../models/friendship';

export type UpstreamCreateFriendshipProperties = Pick<
  FriendshipProperties,
  'addressee_id'
>;
export class FriendshipApi extends GenericModelApi<FriendshipProperties> {
  constructor() {
    super('friendships');
  }
}
