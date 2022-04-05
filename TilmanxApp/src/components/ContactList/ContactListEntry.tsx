import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {Contact} from '../../models/contact';
import {Avatar} from '../Avatar/Avatar';
import {defaultTheme} from '../../styles/theme';

export interface ContactListEntryProps {
  contact: Contact;
}

export const ContactListEntry: React.FC<ContactListEntryProps> = ({
  contact,
}) => {
  const render = (): React.ReactElement => {
    return (
      <View style={styles.container}>
        <Avatar />
        <View style={styles.textView}>
          <Text style={[defaultTheme.typography.body2, styles.text]}>
            {`${contact.first_name} ${contact.last_name}`}
          </Text>
        </View>
      </View>
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
