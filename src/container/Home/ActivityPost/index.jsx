import { Box, Center, Container } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import PostAPI from '../../../API/postAPI';
import ActivityCard from '../../../components/ActivityCard';
import TitleCustom from '../../../components/TitleCustom';
import ROUTER from '../../../router';

export default function ActivityPost() {
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const res = await PostAPI.getAllEvents(6);
      setData(res.data);
    };
    fetchData();
  }, []);

  return (
    <Container maxW='container.xl'>
      <Center>
        <TitleCustom
          title={'Sự kiện - Hoạt động'}
          subtitle={'Các hoạt động do đoàn viên Khoa Sư phạm trường Đại học Cần Thơ tổ chức'}
        />
      </Center>
      <Box>
        <Swiper
          slidesPerView={2}
          spaceBetween={30}
          pagination={{
            dynamicBullets: true,
          }}
          breakpoints={{
            200: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            608: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            927: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1184: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
          loop={true}
          modules={[Pagination, Autoplay]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          className='mySwiper'
        >
          {data &&
            data.map((item, index) => (
              <SwiperSlide key={index}>
                <Link to={'hoat-dong/' + item.id}>
                  <ActivityCard data={item.attributes} />
                </Link>
              </SwiperSlide>
            ))}
        </Swiper>
      </Box>
    </Container>
  );
}
