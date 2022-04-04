import React from 'react';
import {FlatList} from 'react-native';

import {Contact} from '../../models/contact';
import {ContactListEntry} from './ContactListEntry';

export interface ContactListProps {
  contacts: ReadonlyArray<Contact>;
}

export const ContactList: React.FC<ContactListProps> = ({contacts}) => {
  const render = (): React.ReactElement => {
    return (
      <FlatList
        data={contacts}
        renderItem={({item, index}) => (
          <ContactListEntry key={index} contact={item} />
        )}
      />
    );
  };

  return render();
};
