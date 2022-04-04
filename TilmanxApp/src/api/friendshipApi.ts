import {GenericModelApi} from '../lib/baseApi';
import {FriendshipProperties} from '../models/friendship';

export class FriendshipApi extends GenericModelApi<FriendshipProperties> {
  constructor() {
    super('friendships');
  }
}
