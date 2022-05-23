import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: 'Roboto, sans-serif',
    body: 'Roboto, sans-serif',
  },
  colors: {
    primary: '#00AFFF',
    layout: '#0E346F',
    BGColor: '#F5F5F5',
    transparent: 'transparent',
  },
});

export default theme;
