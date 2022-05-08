import {compareDate} from '../lib/sort';

export interface ConversationProperties {
  id: number;
  type: ConversationType;
  creator: number;
  latest_message: string | null;
  addressee: string;
  created_at: string;
  updated_at: string;
  latest_message_at: string | null;
}

export enum ConversationType {
  /**
   * A private conversation consists of two participants.
   */
  Private = 'PRIVATE',
  /**
   * A group conversation consists of finite participants.
   */
  Group = 'GROUP',
}

export class Conversation {
  public readonly id: number;
  public readonly type: ConversationType;
  public readonly creator: number;
  public readonly latest_message: string | null;
  public readonly addressee: string;
  public readonly created_at: Date;
  public readonly updated_at: Date;
  public readonly latest_message_at: Date | null;

  constructor(props: ConversationProperties) {
    this.id = props.id;
    this.type = props.type;
    this.creator = props.creator;
    this.latest_message = props.latest_message;
    this.addressee = props.addressee;
    this.created_at = new Date(props.created_at);
    this.updated_at = new Date(props.updated_at);
    this.latest_message_at = props.latest_message_at
      ? new Date(props.latest_message_at)
      : null;
  }

  /**
   * Sort conversations by latest_message_at descending
   */
  public static compare(left: Conversation, right: Conversation): number {
    return compareDate(right.latest_message_at, left.latest_message_at);
  }
}
