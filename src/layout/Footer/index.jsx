import { Box, Container, Divider, Flex, Heading, Image, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { BsFacebook, BsFillTelephoneFill, BsInstagram, BsLinkedin, BsYoutube } from 'react-icons/bs';
import { FaFax, FaTiktok } from 'react-icons/fa';
import { IoLocationSharp } from 'react-icons/io5';
import { MdOutlineMailOutline } from 'react-icons/md';
import { Link } from 'react-router-dom';
import LogoTransfer from '../../assets/images/MainLogoRemovebg.png';
import ROUTER from '../../router';

const data = {
  col1: [
    { icon: <IoLocationSharp />, title: 'Khu II, Đ. 3/2, P. Xuân Khánh, Q. Ninh Kiều, Cần Thơ' },
    { icon: <BsFillTelephoneFill />, title: 'Điện thoại: +84292 3832 663' },
    { icon: <FaFax />, title: 'Fax: +84292 3838474' },
    { icon: <MdOutlineMailOutline />, title: 'Email: dhct@ctu.edu.vn' },
  ],
  col3: [{ title: 'Bài đăng mới', link: ROUTER.BAI_DANG }],
  col2: [
    { title: 'Tất cả các hoạt động', link: ROUTER.HOAT_DONG.ALL },
    { title: 'Đang diễn ra', link: ROUTER.HOAT_DONG.DANG_DIEN_RA },
    { title: 'Đã kết thúc', link: ROUTER.HOAT_DONG.DA_KET_THUC },
  ],
  col4: [
    { icon: <BsFacebook />, title: 'Facebook', link: 'https://www.facebook.com/daihoccantho/' },
    {
      icon: <BsYoutube />,
      title: 'Youtube',
      link: 'https://www.youtube.com/channel/UC-_xZYZQXZzQX7Zq-_XZq6g',
    },
    { icon: <BsInstagram />, title: 'Instagram', link: 'https://www.instagram.com/daihoccantho/' },
    { icon: <BsLinkedin />, title: 'Linkedin', link: 'https://www.linkedin.com/daihoccantho/' },
    { icon: <FaTiktok />, title: 'Tiktok', link: 'https://www.tiktok.com/daihoccantho/' },
  ],
};

export default function Footer() {
  return (
    <Box bgColor='layout' color='white'>
      <Container maxW='container.xl' py={14}>
        <SimpleGrid columns={{ xl: 4, lg: 2, md: 2, sm: 1 }} spacing={10}>
          <VStack align='flex-start' spacing={4}>
            <Flex>
              <Image boxSize={28} mr={3} src={LogoTransfer} alt='LogoFooterFull' />
              <Box>
                <Heading fontSize={23}>Đoàn thanh niên khoa Sư phạm</Heading>
                <br />
                <Text fontSize={20}>Đại học Cần thơ</Text>
              </Box>
            </Flex>
            {data.col1.map((item, index) => (
              <Flex key={index} alignItems='center'>
                <div style={{ fontSize: 17 }}>{item.icon}</div>
                <Text fontSize={16} ml={2}>
                  {item.title}
                </Text>
              </Flex>
            ))}
          </VStack>
          <VStack align='flex-start' spacing={4}>
            <Heading size='md'>Hoạt Động</Heading>
            {data.col2.map((data, i) => (
              <Link key={i} to={data.link}>
                <Text>{data.title}</Text>
              </Link>
            ))}
          </VStack>
          <VStack align='flex-start' spacing={4}>
            <Heading size='md'>Bài Đăng</Heading>
            {data.col3.map((data, i) => (
              <Link key={i} to={data.link}>
                <Text>{data.title}</Text>
              </Link>
            ))}
          </VStack>
          <VStack align='flex-start' spacing={4}>
            <Heading size='md'>Mạng xã hội</Heading>
            {data.col4.map((data, i) => (
              <a key={i} href={data.link}>
                <Flex key={i} alignItems='center'>
                  <div style={{ fontSize: 17 }}>{data.icon}</div>
                  <Text fontSize={16} ml={2}>
                    {data.title}
                  </Text>
                </Flex>
              </a>
            ))}
          </VStack>
        </SimpleGrid>
      </Container>
      <Divider />
      <Container maxW='container.xl' py={4}>
        <Text fontSize={14} opacity={0.7}>
          © 2022 Khoa Sư phạm / Đại học Cần thơ
        </Text>
      </Container>
    </Box>
  );
}
