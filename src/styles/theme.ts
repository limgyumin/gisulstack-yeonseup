export const colors = {
  white: '#FFF',
  black: '#000',
  gray100: '#F4F4F4',
  gray200: '#D6D6D6',
  gray300: '#BFBFBF',

  dimBlack: '#0000008c',

  blue100: '#CDE8FF',
  blue500: '#3CA5FF',

  ftWhite: '#FFF',
  ftBlack: '#000',
  ftGray100: '#F4F4F4',
  ftGray200: '#D6D6D6',
  ftGray300: '#BFBFBF',
  ftGray400: '#A4A4A4',

  ftGray600: '#5C5C5C',
};

export const sizes = {
  mobile: 580,
  tablet: 768,
  smallDesktop: 1044,
  desktop: 1284,
};

type SizeLabels = keyof typeof sizes;
type Media = Record<SizeLabels, string>;

export const medias = (Object.keys(sizes) as SizeLabels[]).reduce(
  (acc, label) => {
    acc[label] = `@media only screen and (max-width: ${sizes[label]}px)`;
    return acc;
  },
  {} as Media,
);

export const theme = {
  colors,
  medias,
};

export type CustomTheme = typeof theme;
