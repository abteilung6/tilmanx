import {axiosInstance} from '../lib/axiosInstance';
import {GenericModelApi} from '../lib/baseApi';
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
    return axiosInstance.get<UserProperties>(this.routeWith('me'));
  }
}
