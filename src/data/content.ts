export type ContentIcon =
  | 'file'
  | 'globe'
  | 'image'
  | 'linkedin'
  | 'slides'
  | 'video';

export type ContentLink = {
  href: string;
  label: string;
  icon: ContentIcon;
};

export type ContentMedia = {
  src: string;
  alt: string;
  label: string;
};
