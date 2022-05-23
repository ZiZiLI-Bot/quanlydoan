/* eslint-disable react/prop-types */
import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import styles from './titleCustom.module.css';

export default function TitleCustom({ title, subtitle }) {
  return (
    <Box w={350} my={4}>
      <Heading textAlign='center' size='lg'>
        {title}
      </Heading>
      <div className={styles.Divider1} />
      <div className={styles.Divider2} />
      <Text textAlign='center' fontSize={12} sx={{ opacity: 0.7 }}>
        {subtitle}
      </Text>
    </Box>
  );
}
