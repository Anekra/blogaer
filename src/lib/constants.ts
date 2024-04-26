import { WysiwygType } from './enums';

export const PASS_CHECK = {
  PASS_MINIMUM: 'Password must be at least 4 characters.',
  PASS_WEAK: 'Your password is too weak.'
};

export const CUSTOM_PLACEHOLDER = [
  WysiwygType.Quote,
  WysiwygType.Code,
  WysiwygType.Image,
  WysiwygType.Divider
];

export const LIST_TYPES: string[] = [
  WysiwygType.ListBullets,
  WysiwygType.ListNumbers
]