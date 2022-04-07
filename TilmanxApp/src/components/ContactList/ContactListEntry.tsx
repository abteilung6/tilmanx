import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import {Contact} from '../../models/contact';
import {Avatar} from '../Avatar/Avatar';
import {defaultTheme} from '../../styles/theme';

export interface ContactListEntryProps {
  contact: Contact;
  onPress?: (contact: Contact) => void;
}

export const ContactListEntry: React.FC<ContactListEntryProps> = ({
  contact,
  onPress,
}) => {
  const render = (): React.ReactElement => {
    return (
      <Pressable
        style={styles.container}
        onPress={() => onPress && onPress(contact)}>
        <Avatar />
        <View style={styles.textView}>
          <Text style={[defaultTheme.typography.body2, styles.text]}>
            {`${contact.first_name} ${contact.last_name}`}
          </Text>
        </View>
      </Pressable>
    );
  };

  return render();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 5,
  },
  textView: {
    justifyContent: 'center',
    marginLeft: 16,
  },
  text: {
    color: 'black',
  },
});
