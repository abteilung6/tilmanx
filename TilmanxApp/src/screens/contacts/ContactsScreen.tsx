import React from 'react';
import {StyleSheet, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import {BottomTabParamList} from '../../navigation/types';
import {useFriendshipsQuery} from '../../hooks/useFriendshipQuery';
import {useUserMeQuery} from '../../hooks/useUserQuery';
import {Contact} from '../../models/contact';
import {AppBar} from '../../components/AppBar/AppBar';
import {ContactList} from '../../components/ContactList/ContactList';

export const ContactsScreen: React.FC<
  StackScreenProps<BottomTabParamList, 'Contacts'>
> = () => {
  const friendshipsQuery = useFriendshipsQuery();
  const friendships = friendshipsQuery.data || [];
  const userMeQuery = useUserMeQuery();
  const user = userMeQuery.data;
  const contacts = Contact.fromFriendships(user ? user.id : NaN, friendships);

  const render = (): React.ReactElement => {
    return (
      <View style={styles.container}>
        <AppBar title="Contacts" />
        {renderContacts()}
      </View>
    );
  };

  const renderContacts = (): React.ReactNode => {
    return (
      <View style={styles.contacts}>
        <ContactList contacts={contacts} />
      </View>
    );
  };

  return render();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contacts: {
    marginHorizontal: 25,
  },
});
