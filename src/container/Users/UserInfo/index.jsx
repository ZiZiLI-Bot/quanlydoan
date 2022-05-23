/* eslint-disable no-unused-vars */
import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Select,
  Stack,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import vi from 'date-fns/locale/vi';
import React, { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import AuthStorage from '../../../feature/AuthStorage';
import AuthAPI from '../../../API/authAPI';
registerLocale('vi', vi);

export default function UserInfo() {
  const [user, setUser] = useState(JSON.parse(AuthStorage.getKey('user')));
  const [name, setName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);
  const [gioiTinh, setGioiTinh] = useState(user.gioiTinh);
  const [ngaySinh, setNgaySinh] = useState(new Date());
  const [diachi, setDiachi] = useState(user.diaChi);
  const [ngayVaoDoan, setNgayVaoDoan] = useState(new Date());
  const [noiSinhHoatD, setNoiSinhHoatD] = useState(user.noiSinhHoat);
  const [SDT, setSDT] = useState(user.SDT);
  const [error, setError] = useState('');

  useEffect(() => {
    setNgaySinh(new Date(user.ngaySinh));
    setNgayVaoDoan(new Date(user.NgayVaoDoan));
  }, []);

  const handleUpdate = async () => {
    const updateData = {
      fullName: name,
      email: email,
      gioiTinh: gioiTinh,
      ngaySinh: moment(ngaySinh).format('YYYY-MM-DD'),
      diaChi: diachi,
      NgayVaoDoan: moment(ngayVaoDoan).format('YYYY-MM-DD'),
      noiSinhHoat: noiSinhHoatD,
      SDT: SDT,
    };
    const res = await AuthAPI.updateAccount(user.id, updateData);
    console.log(res);
    if (!res.status) {
      setError('Cập nhật thành công');
      if (localStorage.getItem('user')) {
        localStorage.setItem('user', JSON.stringify(res));
      } else {
        sessionStorage.setItem('user', JSON.stringify(res));
      }
    } else {
      setError('Lỗi hệ thống!');
    }
  };

  return (
    <Flex minH={'70vh'} align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Thông tin cá nhân
          </Heading>
        </Stack>
        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
          <Stack spacing={4}>
            <VStack justify='center'>
              <Avatar size='xl' name={user && user.fullName} />
              <Text fontSize={20}>{user && user.isAdmin ? 'Admin' : 'Đoàn Viên'}</Text>
            </VStack>
            <HStack>
              <Box>
                <FormControl id='HoVaTen' isRequired>
                  <FormLabel>Họ và tên:</FormLabel>
                  <Input type='text' defaultValue={user && user.fullName} onChange={(e) => setName(e.target.value)} />
                </FormControl>
              </Box>
              <Box>
                <FormControl id='NgaySinh' isRequired>
                  <FormLabel>Ngày sinh</FormLabel>
                  <Box style={{ padding: '5px' }} border='1px solid #CBD5E0' borderRadius='5px' h='38px'>
                    <DatePicker
                      locale='vi'
                      dateFormat='dd/MM/yyyy'
                      selected={ngaySinh}
                      onChange={(date) => setNgaySinh(date)}
                    />
                  </Box>
                </FormControl>
              </Box>
              <Box>
                <FormControl id='GioiTinh' isRequired w={170}>
                  <FormLabel>Giới tính</FormLabel>
                  <Select defaultValue={user?.gioiTinh} onChange={(e) => setGioiTinh(e.target.value)}>
                    <option value='Nam'>Nam</option>
                    <option value='Nữ'>Nữ</option>
                  </Select>
                </FormControl>
              </Box>
            </HStack>
            <Box>
              <FormControl id='Địa chỉ' isRequired>
                <FormLabel>Địa chỉ:</FormLabel>
                <Input type='text' defaultValue={user?.diaChi} onChange={(e) => setDiachi(e.target.value)} />
              </FormControl>
            </Box>
            <Box>
              <FormControl id='Email' isRequired>
                <FormLabel>Email:</FormLabel>
                <Input type='text' defaultValue={user?.email} onChange={(e) => setEmail(e.target.value)} />
              </FormControl>
            </Box>
            <HStack>
              <Box>
                <FormControl id='NgayVaoDoan' isRequired>
                  <FormLabel>Ngày vào đoàn:</FormLabel>
                  <Box style={{ padding: '5px' }} border='1px solid #CBD5E0' borderRadius='5px' h='38px'>
                    <DatePicker
                      locale='vi'
                      dateFormat='dd/MM/yyyy'
                      selected={ngayVaoDoan}
                      onChange={(date) => setNgayVaoDoan(date)}
                    />
                  </Box>
                </FormControl>
              </Box>
              <Box>
                <FormControl id='NoiSinhH' isRequired>
                  <FormLabel>Nơi sinh hoạt đoàn:</FormLabel>
                  <Input
                    type='text'
                    defaultValue={user?.noiSinhHoat}
                    onChange={(e) => setNoiSinhHoatD(e.target.value)}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id='SDT' isRequired>
                  <FormLabel>Số điện thoại:</FormLabel>
                  <Input type='text' defaultValue={user?.SDT} onChange={(e) => setSDT(e.target.value)} />
                </FormControl>
              </Box>
            </HStack>
            <Stack spacing={10} pt={2}>
              <Button
                onClick={handleUpdate}
                loadingText='Submitting'
                size='lg'
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                fontWeight={'light'}
              >
                Cập nhật thông tin
              </Button>
              <Text color='primary'>{error}</Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
