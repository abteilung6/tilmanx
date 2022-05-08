import React from 'react';
import {
  StyleSheet,
  TextInput as NativeTextInput,
  TextInputProps as NativeTextInputProps,
} from 'react-native';

import {defaultTheme} from '../../styles/theme';

export type ChatInputProps = NativeTextInputProps;

export const ChatInput: React.FC<ChatInputProps> = ({style, ...props}) => {
  const render = (): React.ReactElement => {
    return (
      <NativeTextInput
        style={[defaultTheme.typography.body1, styles.textInput, style]}
        {...props}
      />
    );
  };

  return render();
};

const styles = StyleSheet.create({
  textInput: {
    borderRadius: 25,
    borderColor: defaultTheme.solidColors.lightGray,
    backgroundColor: defaultTheme.solidColors.lightGray,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: defaultTheme.solidColors.gray,
  },
});
