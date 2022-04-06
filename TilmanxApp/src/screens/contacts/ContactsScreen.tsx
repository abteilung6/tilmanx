import React from 'react';
import {StyleSheet, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {RootStackParamList} from '../../navigation/types';
import {useFriendshipsQuery} from '../../hooks/useFriendshipQuery';
import {useUserMeQuery} from '../../hooks/useUserQuery';
import {Contact} from '../../models/contact';
import {AppBar} from '../../components/AppBar/AppBar';
import {ContactList} from '../../components/ContactList/ContactList';
import {defaultTheme} from '../../styles/theme';

export const ContactsScreen: React.FC<
  StackScreenProps<RootStackParamList, 'Contacts'>
> = ({navigation}) => {
  const friendshipsQuery = useFriendshipsQuery();
  const friendships = friendshipsQuery.data || [];
  const userMeQuery = useUserMeQuery();
  const user = userMeQuery.data;
  const contacts = Contact.fromFriendships(user ? user.id : NaN, friendships);

  const render = (): React.ReactElement => {
    return (
      <View style={styles.container}>
        <AppBar title="Contacts" right={renderRightAppBar()} />
        {renderContacts()}
      </View>
    );
  };

  const renderRightAppBar = (): React.ReactNode => {
    return (
      <View style={styles.rightAppBar}>
        <Ionicons
          name="person-add-outline"
          size={24}
          color={defaultTheme.solidColors.gray}
          style={styles.icon}
          onPress={() => navigation.navigate('ContactRequests')}
        />
        <Ionicons
          name="search-outline"
          size={24}
          color={defaultTheme.solidColors.gray}
          onPress={() => navigation.navigate('SearchContacts')}
        />
      </View>
    );
  };

  const renderContacts = (): React.ReactNode => {
    return (
      <View style={styles.contacts}>
        <ContactList
          contacts={contacts}
          onPress={contact => navigation.push('Profile', {userId: contact.id})}
        />
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
  rightAppBar: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  icon: {
    marginRight: 20,
  },
});
