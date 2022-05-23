import { Box, Flex, Text } from '@chakra-ui/react';
import moment from 'moment';
import React from 'react';
import { AiOutlineSchedule } from 'react-icons/ai';
import StrapiImg from '../SPImage';
export default function index({ data }) {
  return (
    <Flex
      align='center'
      w='100%'
      h='140px'
      bgColor='BGColor'
      boxShadow='md'
      cursor='pointer'
      borderRadius={5}
      overflow='hidden'
    >
      <Box h='100%' w='160%'>
        <StrapiImg src={data.image} />
      </Box>
      <Box mx={2}>
        <Flex alignItems='center' fontSize={13} color='primary'>
          <AiOutlineSchedule />
          <Text ml={2}>{moment(data.createdAt).format('DD-MM-YYYY')}</Text>
        </Flex>
        <Text className='limitLine'>{data.title}</Text>
        <Flex justifyContent='flex-end' mt={1}>
          <Text color='primary'>Xem thêm</Text>
        </Flex>
      </Box>
    </Flex>
  );
}
