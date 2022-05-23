import { Center, Container, SimpleGrid } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PostAPI from '../../API/postAPI';
import CKPaginator from '../../components/CKPaginator';
import PostCard from '../../components/PostCard';
import TitleCustom from '../../components/TitleCustom';

export default function InfoPostPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState();
  const handlePageChange = (nextPage) => {
    setCurrentPage(nextPage);
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = await PostAPI.getAllPosts(6, currentPage);
      setData(res);
    };
    fetchData();
  }, [currentPage]);
  return (
    <Container maxW='container.xl'>
      <Center>
        <TitleCustom title='Bài đăng' subtitle='Tin tức mới nhất về các hoạt động đoàn trường Đại học Cần Thơ' />
      </Center>
      <SimpleGrid columns={{ sm: 1, md: 1, lg: 2 }} spacing={12}>
        {data &&
          data.data.map((item, index) => (
            <Link key={index} to={`bai-dang/${item.id}`}>
              <PostCard data={item.attributes} />
            </Link>
          ))}
      </SimpleGrid>
      <Center>
        <CKPaginator total={data ? data.meta.pagination.total : 0} totalPages={6} changedPages={handlePageChange} />
      </Center>
    </Container>
  );
}
