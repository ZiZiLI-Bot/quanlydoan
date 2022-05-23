import { Box, Button, Center, Container, SimpleGrid } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PostAPI from '../../../API/postAPI';
import PostCard from '../../../components/PostCard';
import TitleCustom from '../../../components/TitleCustom';
import ROUTER from '../../../router';

export default function PostPreview() {
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const res = await PostAPI.getAllPosts(6);
      setData(res.data);
    };
    fetchData();
  }, []);

  return (
    <Box bgColor='BGColor'>
      <Center>
        <TitleCustom
          title='Tin tức - Bài đăng'
          subtitle='Tin tức mới nhất về các hoạt động đoàn trường Đại học Cần Thơ'
        />
      </Center>
      <Box>
        <Container maxW={'container.xl'} py={4}>
          <SimpleGrid columns={{ sm: 1, md: 1, lg: 2 }} spacing={12}>
            {data &&
              data.map((item, index) => (
                <Link key={index} to={ROUTER.VIEW_DETAIL_POST + '/' + item.id}>
                  <PostCard data={item.attributes} />
                </Link>
              ))}
          </SimpleGrid>
          <Center mt={4}>
            <Link to={ROUTER.BAI_DANG}>
              <Button fontWeight='light' colorScheme='blue'>
                Xem Thêm
              </Button>
            </Link>
          </Center>
        </Container>
      </Box>
    </Box>
  );
}
