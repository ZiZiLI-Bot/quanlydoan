import { Box, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import moment from 'moment';
import SPImage from '../SPImage';
import { BsFillPersonFill } from 'react-icons/bs';
import { AiOutlineSchedule } from 'react-icons/ai';
import styles from './ActivityCard.module.css';

export default function ActivityCard({ data }) {
  return (
    <Box w={285} mb={10} sx={{ overflow: 'hidden', borderRadius: 7, cursor: 'pointer' }} className='card'>
      <SPImage src={data.image} />
      <VStack align='flex-start' bgColor='BGColor' px={4} pt={2}>
        <Heading className={styles.heading} h='50px' size={15}>
          {data.title}
        </Heading>
        <Box>
          <Flex alignItems='center' fontSize={13} className='writer'>
            <BsFillPersonFill />
            <Text ml={2}>{data.users_permissions_user.data?.attributes?.fullName}</Text>
          </Flex>
          <Flex alignItems='center' fontSize={13} className='writer'>
            <AiOutlineSchedule />
            <Text ml={2}>Ngày kết thúc: {moment(data.deadline).format('DD-MM-YYYY')}</Text>
          </Flex>
        </Box>
      </VStack>
    </Box>
  );
}
