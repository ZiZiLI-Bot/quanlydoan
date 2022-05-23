import { Image } from '@chakra-ui/react';
import React from 'react';

export default function StrapiImg({ src, objectFit }) {
  const { alternativeText, url } = src.data.attributes;
  return (
    <Image
      layout='fill'
      w='100%'
      h='100%'
      priority={true}
      objectFit={objectFit || 'cover'}
      src={'http://localhost:1337' + url}
      alt={alternativeText || ''}
    />
  );
}
