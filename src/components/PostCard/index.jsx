import { Box, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import moment from 'moment';
import React from 'react';
import { AiOutlineSchedule } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import SPImage from '../SPImage';
import styles from './PostCard.module.css';

export default function PostCard({ data }) {
  return (
    <Flex
      className={`${styles.PostCard} card`}
      bgColor='white'
      w='100%'
      sx={{ borderRadius: '5px', overflow: 'hidden', boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }}
    >
      <Box w='35%'>
        <SPImage src={data.image} />
      </Box>
      <VStack align='flex-start' mx={3} my={2} w='65%'>
        <Heading size='sm' className={styles.Heading}>
          {data.title}
        </Heading>
        <Box>
          <Box w='200px' h='2px' bgColor='primary' my={1} />
          <Box w='200px' h='2px' bgColor='primary' my={1} />
        </Box>
        <Text fontSize={14} className={styles.Subtitle}>
          {data.subTitle}
        </Text>
        <Flex alignItems='center' fontSize={13} className='writer'>
          <BsFillPersonFill />
          <Text ml={2}>{data.users_permissions_user.data?.attributes?.fullName}</Text>
        </Flex>
        <Flex alignItems='center' fontSize={13} className='writer'>
          <AiOutlineSchedule />
          <Text ml={2}>{moment(data.createdAt).format('DD-MM-YYYY')}</Text>
        </Flex>
      </VStack>
    </Flex>
  );
}
