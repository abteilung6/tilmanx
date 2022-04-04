import {axiosInstance} from './axiosInstance';

export class BaseApi {
  public readonly tag: string;

  constructor(tag: string) {
    this.tag = tag;
  }

  public get route() {
    return `${this.tag}/`;
  }

  public routeWith(subTag: string): string {
    return `${this.route}${subTag}/`;
  }
}

export class GenericModelApi<T> extends BaseApi {
  constructor(tag: string) {
    super(tag);
  }

  public list<F extends object>(filterParams?: F) {
    return axiosInstance.get<T[]>(this.route, {
      params: filterParams,
    });
  }
}
