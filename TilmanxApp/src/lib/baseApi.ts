import {axiosInstance} from './axiosInstance';

export class BaseApi {
  public readonly tag: string;

  constructor(tag: string) {
    this.tag = tag;
  }

  public get route() {
    return `${this.tag}/`;
  }

  public routeWithId(id: number): string {
    return `${this.route}${id}/`;
  }

  public routeWithAction(action: string): string {
    return `${this.route}${action}/`;
  }

  public routeWithDetailAction(id: number, action: string): string {
    return `${this.route}${id}/${action}/`;
  }
}

export class GenericModelApi<T> extends BaseApi {
  constructor(tag: string) {
    super(tag);
  }

  public retrieve(id: number) {
    return axiosInstance.get<T>(this.routeWithId(id));
  }

  public list<F extends object>(filterParams?: F) {
    return axiosInstance.get<T[]>(this.route, {
      params: filterParams,
    });
  }

  public post<D extends object>(data: D) {
    return axiosInstance.post<T>(this.route, data);
  }

  public delete(id: number) {
    return axiosInstance.delete(this.routeWithId(id));
  }
}
