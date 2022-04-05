import {TextStyle} from 'react-native';

import {SolidColor} from './color';

export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'body1'
  | 'body2'
  | 'subtitle2';

export const typography: Record<TypographyVariant, TextStyle> = {
  h1: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 40,
    lineHeight: 56,
    letterSpacing: -1.25,
    color: SolidColor.gray,
  },
  h2: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 32,
    lineHeight: 48,
    letterSpacing: -1,
    color: SolidColor.gray,
  },
  h3: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 40,
    letterSpacing: -0.75,
    color: SolidColor.gray,
  },
  body1: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 24,
    letterSpacing: -0.5,
    color: SolidColor.gray,
  },
  body2: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.5,
    color: SolidColor.gray,
  },
  subtitle2: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 24,
    letterSpacing: -0.5,
    color: SolidColor.gray,
  },
};
