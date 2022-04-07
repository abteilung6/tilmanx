import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import {RootStackParamList} from '../../navigation/types';
import {AppBar} from '../../components/AppBar/AppBar';
import {SearchBox} from '../../components/SearchBox/SearchBox';
import {ContactList} from '../../components/ContactList/ContactList';
import {useUserSearchQuery} from '../../hooks/useUserQuery';
import {Contact} from '../../models/contact';

export const SearchContactsScreen: React.FC<
  StackScreenProps<RootStackParamList, 'SearchContacts'>
> = ({navigation}) => {
  const [searchValue, setSearchValue] = useState('');
  const userSearchQuery = useUserSearchQuery(
    {search: searchValue},
    {
      enabled: searchValue !== '',
    },
  );
  const users = userSearchQuery.data || [];
  const contacts = Contact.fromUsers(users);

  const render = (): React.ReactElement => {
    return (
      <View style={styles.container}>
        <AppBar title="Search" />
        <View style={styles.innerContainer}>
          <SearchBox
            placeholder="Search ..."
            value={searchValue}
            onChangeText={setSearchValue}
          />
          {renderContacts()}
        </View>
      </View>
    );
  };

  const renderContacts = (): React.ReactElement => {
    return (
      <View style={styles.list}>
        <ContactList
          contacts={contacts}
          refreshing={userSearchQuery.isFetching}
          onPress={contact => navigation.push('Profile', {userId: contact.id})}
          onRefresh={() => userSearchQuery.refetch()}
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
  innerContainer: {
    marginHorizontal: 25,
  },
  list: {
    marginTop: 15,
  },
});
