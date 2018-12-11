import Typography from 'typography';

const typography = new Typography({
  headerFontFamily: [
    'Roboto Slab',
    'Helvetica',
    'sans-serif'
  ],
  headerWeight: 300,
  bodyFontFamily: ['Helvetica', 'Arial', 'sans-serif'],
  bodyWeight: 300,
  scaleRatio: 2,
  baseLineHeight: 1.5,
  googleFonts: [
    {
      name: 'Roboto Slab',
      styles: [
        '300',
      ],
    },
  ],
  //eslint-disable-next-line
  overrideStyles: ({adjustFontSizeTo, scale, rhythm}, options) => ({
    'a': {
      color: '#949492',
    },
    'a:hover,a:active': {
      color: options.bodyColor,
    },
    'body': {
      textAlign: 'center'
    },
    'ul': {
      listStylePosition: 'inside'
    }
  }),
});
// #369e6c
//https://github.com/KyleAMathews/typography.js/blob/master/packages/typography-theme-alton/src/index.js

export default typography;
