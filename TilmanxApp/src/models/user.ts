export interface UserProperties {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  profile_id: number;
  is_verified: boolean;
}

export class User {
  public readonly id: number;
  public readonly username: string;
  public readonly email: string;
  public readonly first_name: string;
  public readonly last_name: string;
  public readonly profile_id: number;
  public readonly is_verified: boolean;

  constructor(props: UserProperties) {
    this.id = props.id;
    this.username = props.username;
    this.email = props.email;
    this.first_name = props.first_name;
    this.last_name = props.last_name;
    this.profile_id = props.profile_id;
    this.is_verified = props.is_verified;
  }
}
