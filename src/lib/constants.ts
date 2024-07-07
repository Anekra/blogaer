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

export const WITH_SEARCHBAR: string[] = ['/home', '/blog/explore'];

export const CATEGORIES: string[] = [
  'Food',
  'Travel',
  'Programming',
  'Finance',
  'Sports',
  'Cooking',
  'Entertainment',
  'Gaming',
  'News',
  'Cosmetics',
  'Fitness & Health',
  'Parenting & Education',
  'Science & Environment',
  'DIY & Crafts',
  'Fashion & Beauty',
  'Relationships',
  'Software Development',
  'Interior Design',
  'Photography & Video',
  'Tech & Innovation',
  'Music & Audio',
  'Web Design',
  'Self-Improvement',
  'History & Culture',
  'Politics & Society',
  'Animals & Pets',
  'Web Development',
  'Home & Garden',
  'Business & Entrepreneurship',
  'Mobile Development',
  'Content Marketing & Social Media',
  'Productivity',
  'Minimalism',
  'Graphic Design',
  'Desktop Development',
  'Software Design',
  'Movies & TV',
  'Language Learning',
  'Motivation',
  'Climate Change',
  'Embedded Systems',
  'Blockchain & Cryptocurrency',
  'Databases',
  'Artificial Intelligence & Machine Learning',
  'Cybersecurity',
  'DevOps',
  'Python',
  'Java',
  'JavaScript',
  'C',
  'C++',
  'C#',
  'R',
  'PHP',
  'Swift',
  'Kotlin',
  'Go',
  'Assembly Language',
  'SQL',
  'Ruby',
  'Scala',
  'Lua',
  'Dart',
  'TypeScript',
  'Rust',
  'Elm',
  'Haskell',
  'Perl'
];
