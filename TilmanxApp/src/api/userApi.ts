import {axiosInstance} from '../lib/axiosInstance';
import {BaseApi} from '../lib/baseApi';
import {UserProperties} from '../models/user';

export class UserApi extends BaseApi {
  constructor() {
    super('users');
  }

  public me() {
    return axiosInstance.get<UserProperties>(this.routeWith('me'));
  }
}
