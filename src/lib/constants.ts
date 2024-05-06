import { WysiwygType } from './enums';

export const PASS_CHECK = {
  PASS_MINIMUM: 'Password must be at least 4 characters.',
  PASS_WEAK: 'Your password is too weak.'
};

export const LIST_TYPES: string[] = [
  WysiwygType.ListBullets,
  WysiwygType.ListNumbers
]

export const POSITION_TYPES: string[] = [
  WysiwygType.Code,
  WysiwygType.Image,
  WysiwygType.Divider
];

export const NOT_STYLABLE: string[] = [
  WysiwygType.Heading,
  WysiwygType.Code,
  WysiwygType.Image,
  WysiwygType.Divider
];

export const NOT_ALIGNABLE: string[] = [
  WysiwygType.Code,
  WysiwygType.Image,
  WysiwygType.Divider
];