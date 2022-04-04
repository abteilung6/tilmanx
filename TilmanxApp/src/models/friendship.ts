export interface FriendshipProperties {
  id: number;
  requester_id: number;
  requester_username: string;
  requester_first_name: string;
  requester_last_name: string;
  addressee_id: number;
  addressee_username: string;
  addressee_first_name: string;
  addressee_last_name: string;
  offered_at: string;
  accepted_at: string | null;
  updated_at: string;
  status: FriendshipStatus;
}

export enum FriendshipStatus {
  /**
   * Requester has offered the friendship.
   */
  Offered = 'OFFERED',
  /**
   * Addressee has accepted the friendship.
   */
  Accepted = 'ACCEPTED',
}

export class Friendship {
  public readonly id: number;
  public readonly requester_id: number;
  public readonly requester_username: string;
  public readonly requester_first_name: string;
  public readonly requester_last_name: string;
  public readonly addressee_id: number;
  public readonly addressee_username: string;
  public readonly addressee_first_name: string;
  public readonly addressee_last_name: string;
  public readonly offered_at: Date;
  public readonly accepted_at: Date | null;
  public readonly updated_at: Date;
  public readonly status: FriendshipStatus;

  constructor(props: FriendshipProperties) {
    this.id = props.id;
    this.requester_id = props.requester_id;
    this.requester_username = props.requester_username;
    this.requester_first_name = props.requester_first_name;
    this.requester_last_name = props.requester_last_name;
    this.addressee_id = props.addressee_id;
    this.addressee_username = props.addressee_username;
    this.addressee_first_name = props.addressee_first_name;
    this.addressee_last_name = props.addressee_last_name;
    this.offered_at = new Date(props.offered_at);
    this.accepted_at = props.accepted_at ? new Date(props.accepted_at) : null;
    this.updated_at = new Date(props.updated_at);
    this.status = props.status;
  }
}
