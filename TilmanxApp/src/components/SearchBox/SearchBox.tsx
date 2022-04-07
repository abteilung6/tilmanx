import React from 'react';
import {
  StyleSheet,
  TextInput as NativeTextInput,
  TextInputProps as NativeTextInputProps,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {defaultTheme} from '../../styles/theme';

export type SearchBoxProps = NativeTextInputProps;

export const SearchBox: React.FC<SearchBoxProps> = ({style, ...props}) => {
  const render = (): React.ReactElement => {
    return (
      <View style={styles.container}>
        <Ionicons
          name="search-outline"
          size={22}
          color={defaultTheme.solidColors.gray}
          style={styles.icon}
        />
        <NativeTextInput
          style={[defaultTheme.typography.body1, styles.textInput, style]}
          {...props}
        />
      </View>
    );
  };

  return render();
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: defaultTheme.solidColors.offWhite,
    borderRadius: 20,
  },
  icon: {
    alignSelf: 'center',
    paddingLeft: 10,
  },
  textInput: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    width: '80%',
  },
});
