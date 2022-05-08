export interface MessageProperties {
  id: number;
  conversation: number;
  sender: number;
  created_at: string;
  updated_at: string;
  message: string;
}

export class Message {
  public readonly id: number;
  public readonly conversation: number;
  public readonly sender: number;
  public readonly created_at: Date;
  public readonly updated_at: Date;
  public readonly message: string;

  constructor(props: MessageProperties) {
    this.id = props.id;
    this.conversation = props.conversation;
    this.sender = props.sender;
    this.created_at = new Date(props.created_at);
    this.updated_at = new Date(props.updated_at);
    this.message = props.message;
  }

  public static isSender(message: Message, userId: number): boolean {
    return message.sender === userId;
  }
}
