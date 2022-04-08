import {axiosInstance} from '../lib/axiosInstance';

import {BaseApi} from '../lib/baseApi';

export interface RegisterRequest {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  password2: string;
}

export interface RegisterResponse {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  refresh: string;
  access: string;
}

export interface RefreshTokenRequest {
  refresh: string;
}

export interface RefreshTokenResponse {
  access: string;
}

export interface VerifyTokenRequest {
  token: string;
}

export class AuthApi extends BaseApi {
  constructor() {
    super('auth');
  }

  /**
   * Takes a set of user credentials and returns an access and refresh JSON web token pair
   * to prove the authentication of those credentials.
   * @returns Code 200 Authorized
   * @returns Code 401 Unauthorized
   */
  public login(data: LoginRequest) {
    return axiosInstance.post<LoginResponse>(
      this.routeWithAction('token'),
      data,
    );
  }

  /**
   * Takes a refresh type JSON web token and returns an access type JSON web token
   * if the refresh token is valid.
   */
  public refresh(data: RefreshTokenRequest) {
    return axiosInstance.post<RefreshTokenResponse>(
      this.routeWithAction('token/refresh'),
      data,
    );
  }

  /**
   * Takes a token and indicates if it is valid.
   * @returns Code 200 Authorized
   * @returns Code 401 Unauthorized
   */
  public verify(data: VerifyTokenRequest) {
    return axiosInstance.post(this.routeWithAction('token/verify'), data);
  }

  /**
   * Takes user information and creates a new.
   * @returns Code 200 User created
   * @returns Code 400 Invalid user information
   */
  public register(data: RegisterRequest) {
    return axiosInstance.post<RegisterResponse>(
      this.routeWithAction('register'),
      data,
    );
  }
}
