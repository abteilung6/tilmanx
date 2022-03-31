import React from 'react';
import {
  StyleSheet,
  TextInput as NativeTextInput,
  TextInputProps as NativeTextInputProps,
} from 'react-native';

import {defaultTheme} from '../../styles/theme';

export type TextInputProps = NativeTextInputProps;

export const TextInput: React.FC<TextInputProps> = ({style, ...props}) => {
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
    backgroundColor: defaultTheme.solidColors.offWhite,
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
});
