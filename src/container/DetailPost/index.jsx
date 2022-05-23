import { Box, Center, Container, Flex, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import TitleCustom from '../../components/TitleCustom';
import { Link, useParams } from 'react-router-dom';
import PostAPI from '../../API/postAPI';
import SPImage from '../../components/SPImage';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';
import CardInlinePost from '../../components/CardInlinePost';
import ROUTER from '../../router';

export default function DetailPost() {
  const { id } = useParams();
  const [data, setData] = useState();
  const [allPosts, setAllPosts] = useState();
  const [allEvents, setAllEvents] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const res = await PostAPI.getPostById(id);
      const res1 = await PostAPI.getAllPosts(4);
      const res2 = await PostAPI.getAllEvents(4);
      setData(res.data.attributes);
      setAllPosts(res1.data);
      setAllEvents(res2.data);
    };
    fetchData();
  }, [id]);

  return (
    <Container maxW='container.xl'>
      <Flex justifyContent='space-between'>
        <Box w='69%'>
          <Center>
            <TitleCustom title='Bài đăng - Tin tức' />
          </Center>
          <Box w='100%'>{data && <SPImage src={data.image} />}</Box>
          <Flex align='center' fontSize='13px' color='primary' mt={2}>
            <Text ml={2}>
              Người viết: {data?.users_permissions_user.data?.attributes?.fullName} || ngày:{' '}
              {moment(data?.createdAt).format('DD.MM.YYYY')}
            </Text>
          </Flex>
          <HStack position='relative' my={2}>
            <Box h='90%' w='4px' bgColor='primary' position='absolute'></Box>
            <Heading fontSize={28}>{data?.title}</Heading>
          </HStack>
          <HStack position='relative' my={2}>
            <Text fontSize={16} opacity={0.7} pl={2}>
              {data?.subTitle}
            </Text>
          </HStack>
          <Box my={8}>
            <ReactMarkdown>{data?.detailPost}</ReactMarkdown>
          </Box>
        </Box>
        <Box w='29%'>
          <Box>
            <Heading size='lg' mt={6} mb={2}>
              Thông tin mới nhất
            </Heading>
            <Box w='100%' height='3px' bgColor='primary'></Box>
          </Box>
          <VStack mt={8} spacing={4}>
            {allPosts &&
              allPosts.map((item, index) => (
                <Link key={index} to={'/' + ROUTER.VIEW_DETAIL_POST + '/' + item.id}>
                  <CardInlinePost data={item.attributes} />
                </Link>
              ))}
          </VStack>
          <Box>
            <Heading size='lg' mt={6} mb={2}>
              Sự kiện mới nhất
            </Heading>
            <Box w='100%' height='3px' bgColor='primary'></Box>
          </Box>
          <VStack mt={8} spacing={4}>
            {allEvents &&
              allEvents.map((item, index) => (
                <Link key={index} to={'/hoat-dong/' + item.id}>
                  <CardInlinePost data={item.attributes} />
                </Link>
              ))}
          </VStack>
        </Box>
      </Flex>
    </Container>
  );
}
