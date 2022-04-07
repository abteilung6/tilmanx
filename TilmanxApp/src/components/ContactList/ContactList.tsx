import React from 'react';
import {FlatList, FlatListProps} from 'react-native';

import {Contact} from '../../models/contact';
import {ContactListEntry} from './ContactListEntry';

export type ContactListProps = Omit<
  FlatListProps<Contact>,
  'data' | 'renderItem'
> & {
  contacts: ReadonlyArray<Contact>;
  onPress?: (contact: Contact) => void;
};

export const ContactList: React.FC<ContactListProps> = ({
  contacts,
  onPress,
  ...props
}) => {
  const render = (): React.ReactElement => {
    return (
      <FlatList
        data={contacts}
        renderItem={({item, index}) => (
          <ContactListEntry key={index} contact={item} onPress={onPress} />
        )}
        {...props}
      />
    );
  };

  return render();
};
