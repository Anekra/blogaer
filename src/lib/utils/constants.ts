import { HeadingSize, WysiwygAlign, WysiwygType } from './enums';
import { CustomElement } from '../slate';

export const AUTH_HEADER = 'authResponse';

export const VALIDATION = {
  USERNAME_EMPTY: 'Username cannot be empty!',
  USERNAME_MINIMUM: 'Username must be at least 2 characters!',
  USERNAME_WHITESPACE: 'Password cannot contain whitespace!',
  EMAIL_EMPTY: 'Email cannot be empty!',
  EMAIL_MINIMUM: 'Email must be at least 8 characters!',
  EMAIL_WHITESPACE: 'Email cannot contain whitespace!',
  EMAIL_FORMAT: 'Not a valid email!',
  PASSWORD_EMPTY: 'Password cannot be empty!',
  PASSWORD_MINIMUM: 'Password must be at least 8 characters!',
  PASSWORD_WHITESPACE: 'Password cannot contain whitespace!',
  PASSWORD_STRENGTH:
    'Password must contain at least one uppercase, lowercase, number, and special character!',
  EMAIL_OR_USERNAME_EMPTY: 'Email or username cannot be empty!'
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

export const UNSTYLABLE: string[] = [
  WysiwygType.Heading,
  WysiwygType.Code,
  WysiwygType.Image,
  WysiwygType.Divider
];

export const UNALIGNABLE: string[] = [
  WysiwygType.Code,
  WysiwygType.Image,
  WysiwygType.Divider
];

export const INITIAL_VALUE: CustomElement[] = [
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
