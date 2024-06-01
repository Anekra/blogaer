import { Descendant } from 'slate';
import { HeadingSize, WysiwygAlign, WysiwygType } from './enums';

export const PASS_CHECK = {
  PASS_MINIMUM: 'Password must be at least 4 characters.',
  PASS_WEAK: 'Your password is too weak.'
};

export const LIST_TYPES: string[] = [
  WysiwygType.ListBullets,
  WysiwygType.ListNumbers
];

export const PATH_TYPES: string[] = [
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

export const INITIAL_VALUE: Descendant[] = [
  {
    type: WysiwygType.Heading,
    children: [{ text: '' }],
    path: [0, 0],
    align: WysiwygAlign.Left,
    headingSize: HeadingSize.H1
  }
];
