import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  HStack,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import TitleCustom from '../../components/TitleCustom';
import { Link, useParams } from 'react-router-dom';
import PostAPI from '../../API/postAPI';
import SPImage from '../../components/SPImage';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';
import CardInlinePost from '../../components/CardInlinePost';
import ROUTER from '../../router';
import 'moment/locale/vi';
moment.locale('vi');

export default function DetailPost() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const { id } = useParams();
  const [data, setData] = useState();
  const [allPosts, setAllPosts] = useState();
  const [thamGia, setThamGia] = useState(12);
  const [allEvents, setAllEvents] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const res = await PostAPI.getEventById(id);
      const res1 = await PostAPI.getAllPosts(4);
      const res2 = await PostAPI.getAllEvents(4);
      setData(res.data.attributes);
      setAllEvents(res2.data);
      setAllPosts(res1.data);
    };
    fetchData();
  }, [id]);

  const handleToast = () => {
    toast({
      position: 'top-right',
      title: 'Đăng ký ghi danh thành công',
      description: 'Vui lòng để ý thời gian tham dự hoạt động',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    setThamGia(thamGia + 1);
    onClose();
  };

  return (
    <Container maxW='container.xl'>
      <Flex justifyContent='space-between'>
        <Box w='69%'>
          <Center>
            <TitleCustom title='Sự kiện - Hoạt động' />
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
            <ReactMarkdown>{data?.detail}</ReactMarkdown>
          </Box>
          <Box w='100%' bgColor='layout' my={2} borderRadius={10} color='white'>
            <VStack p={3}>
              <Heading fontSize={27} fontWeight='light' textAlign='center'>
                Sự kiện này kiện đang diễn ra
              </Heading>
              <Text fontSize={20}>
                Thời gian: {moment(data?.createdAt).format('DD.MM.YYYY')} ~{' '}
                {moment(data?.deadline).format('DD.MM.YYYY')}
              </Text>
              <Text>Còn {moment(data?.deadline).diff(moment(data?.createdAt), 'day')} ngày ...</Text>
              <Text>Đã có {thamGia} đoàn viên tham gia sự kiện này</Text>
              <Button colorScheme='blue' onClick={onOpen}>
                Đăng ký tham gia
              </Button>
            </VStack>
          </Box>
        </Box>
        <Box w='29%'>
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
        </Box>
      </Flex>
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Ghi danh sự kiện
            </AlertDialogHeader>
            <AlertDialogBody>Xác nhận ghi danh vào sự kiện này.</AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Bỏ
              </Button>
              <Button colorScheme='blue' onClick={handleToast} ml={3}>
                Ghi danh
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Container>
  );
}
