import {axiosInstance} from '../lib/axiosInstance';
import {GenericModelApi} from '../lib/baseApi';
import {ConversationProperties} from '../models/conversation';
import {FriendshipProperties} from '../models/friendship';
import {UserProperties} from '../models/user';

export interface UserSearchParams {
  search: string;
}

export class UserApi extends GenericModelApi<UserProperties> {
  constructor() {
    super('users');
  }

  public search(params: UserSearchParams) {
    return this.list<UserSearchParams>(params);
  }

  public me() {
    return axiosInstance.get<UserProperties>(this.routeWithAction('me'));
  }

  public friendship(userId: number) {
    return axiosInstance.get<FriendshipProperties>(
      this.routeWithDetailAction(userId, 'friendship'),
    );
  }

  public create_conversation(userId: number) {
    return axiosInstance.post<ConversationProperties>(
      this.routeWithDetailAction(userId, 'create_conversation'),
    );
  }
}
