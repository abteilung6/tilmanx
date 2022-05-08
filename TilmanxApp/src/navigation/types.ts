export type RootStackParamList = {
  Splash: undefined;
  Walkthrough: undefined;
  Login: undefined;
  Signup: undefined;
  Root: undefined;
  Contacts: undefined;
  SearchContacts: undefined;
  ContactRequests: undefined;
  Profile: {userId: number};
  Conversations: undefined;
  Conversation: {conversationId: number};
};

export type BottomTabParamList = {
  Contacts: undefined;
  Settings: undefined;
  Conversations: undefined;
};
