import React from 'react';
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';

import {defaultTheme} from '../../styles/theme';

export type ButtonVariant = 'primary' | 'secondary';

export type ButtonProps = PressableProps & {
  /**
   * Text to display.
   */
  children?: string | ReadonlyArray<string>;
  /**
   * Set the button style.
   * @default "primary"
   */
  variant?: ButtonVariant;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  ...props
}) => {
  const render = (): React.ReactElement => {
    return (
      <Pressable
        style={({pressed}) => [
          styles.pressable,
          variantToPressableStyle[variant],
          {opacity: pressed || props.disabled ? 0.8 : 1},
        ]}
        {...props}>
        <Text style={[styles.text, variantToTextStyle[variant]]}>
          {children}
        </Text>
      </Pressable>
    );
  };

  return render();
};

const variantToPressableStyle: Record<ButtonVariant, StyleProp<ViewStyle>> = {
  primary: {
    backgroundColor: defaultTheme.solidColors.blue,
  },
  secondary: {
    backgroundColor: defaultTheme.solidColors.white,
    borderWidth: 1,
    borderColor: defaultTheme.solidColors.blue,
  },
};

const variantToTextStyle: Record<ButtonVariant, StyleProp<TextStyle>> = {
  primary: {
    color: defaultTheme.solidColors.white,
  },
  secondary: {
    color: defaultTheme.solidColors.blue,
  },
};

const styles = StyleSheet.create({
  pressable: {
    borderRadius: 32,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
  },
});
