import {GenericModelApi} from '../lib/baseApi';
import {MessageProperties} from '../models/message';

export interface MessageFilterParams {
  conversation_id?: number;
}

export interface CreateMessageRequest {
  conversation: number;
  message: string;
}

export class MessageApi extends GenericModelApi<MessageProperties> {
  constructor() {
    super('messages');
  }

  public byConversation(conversation_id: number) {
    return this.list<MessageFilterParams>({
      conversation_id: conversation_id,
    });
  }

  public createMessage(data: CreateMessageRequest) {
    return this.post<CreateMessageRequest>(data);
  }
}
