export enum WysiwygType {
  Paragraph = 'paragraph',
  Heading = 'heading',
  Code = 'code',
  Quote = 'quote',
  List = 'list',
  ListBullets = 'bullets',
  ListNumbers = 'numbers',
  Image = 'image',
  Divider = 'divider'
}

export enum WysiwygAlign {
  Left = 'text-left',
  Center = 'text-center',
  Right = 'text-right',
  Justify = 'text-justify'
}

export enum WysiwygStyle {
  Bold = 'bold',
  Italic = 'italic',
  Underline = 'underline',
  Strike = 'strikethrough',
  Link = 'link'
}

export enum HeadingSize {
  H3 = 'text-2xl',
  H2 = 'text-3xl',
  H1 = 'text-5xl'
}

export enum HotKeys {
  'mod+b' = 'bold',
  'mod+i' = 'italic',
  'mod+u' = 'underline',
  'mod+delete' = 'strikethrough'
}

export enum ErrorTypes {
  FETCH_FAILED_ERROR = 'Failed to fetch',
  UNEXPECTED_ERROR = 'An unexpected error occurred'
}
