import {GenericModelApi} from '../lib/baseApi';
import {ConversationProperties} from '../models/conversation';

export class ConversationApi extends GenericModelApi<ConversationProperties> {
  constructor() {
    super('conversations');
  }
}
