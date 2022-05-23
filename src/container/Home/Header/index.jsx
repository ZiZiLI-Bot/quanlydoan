import { Box, Center, Heading, Image } from '@chakra-ui/react';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import image1 from '../../../assets/images/2022_Tuyen_dung.png';
import image2 from '../../../assets/images/sdmd.png';
export default function Header() {
  return (
    <Box>
      <Center bg='#FAC93E' w='full' h='50px'>
        <Heading size='lg' fontWeight='semibold'>
          Đồng thuận - Tận tâm - Chuẩn mực - Sáng tạo
        </Heading>
      </Center>
      <Swiper
        navigation={true}
        loop={true}
        modules={[Navigation, Autoplay]}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        className='mySwiper'
      >
        <SwiperSlide>
          <Image src={image1} alt='Banner' />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={image2} alt='Banner' />
        </SwiperSlide>
      </Swiper>
    </Box>
  );
}
