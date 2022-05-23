import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import vi from 'date-fns/locale/vi';
import moment from 'moment';
import React, { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import AuthAPI from '../../../API/authAPI';
registerLocale('vi', vi);

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [ngaySinh, setNgaySinh] = useState(new Date());
  const [gioiTinh, setGioiTinh] = useState('Nam');
  const [diachi, setDiachi] = useState('');
  const [ngayVaoDoan, setNgayVaoDoan] = useState(new Date());
  const [noiSinhHoatD, setNoiSinhHoatD] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [SDT, setSDT] = useState('');
  const [error, setError] = useState('');

  const handleRegistration = async () => {
    const registerData = {
      fullName: name,
      ngaySinh: moment(ngaySinh).format('YYYY-MM-DD'),
      gioiTinh: gioiTinh,
      diaChi: diachi,
      NgayVaoDoan: moment(ngayVaoDoan).format('YYYY-MM-DD'),
      noiSinhHoat: noiSinhHoatD,
      username: username,
      email: email,
      password: password,
      isAdmin: false,
      SDT: SDT,
    };
    console.log(registerData, ngaySinh, new Date(ngaySinh));
    const res = await AuthAPI.Register(registerData);
    console.log(res);
    if (res.jwt) {
      setError('Đăng ký thành công. Vui lòng cung cấp tài khoản cho Đoàn viên mới');
    } else {
      setError('Lỗi hệ thống!');
    }
  };

  return (
    <Flex minH={'70vh'} align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Cấp tài khoản Đoàn viên mới
          </Heading>
        </Stack>
        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id='HoVaTen' isRequired>
                  <FormLabel>Họ và tên:</FormLabel>
                  <Input type='text' onChange={(e) => setName(e.target.value)} />
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
                  <Select defaultValue={'Nam'} onChange={(e) => setGioiTinh(e.target.value)}>
                    <option value='Nam'>Nam</option>
                    <option value='Nữ'>Nữ</option>
                  </Select>
                </FormControl>
              </Box>
            </HStack>
            <Box>
              <FormControl id='DiaChi' isRequired>
                <FormLabel>Địa chỉ:</FormLabel>
                <Input type='text' onChange={(e) => setDiachi(e.target.value)} />
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
                <FormControl id='NgaySinh' isRequired w={400}>
                  <FormLabel>Nơi sinh hoạt đoàn:</FormLabel>
                  <Input type='text' onChange={(e) => setNoiSinhHoatD(e.target.value)} />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id='SDT' isRequired>
              <FormLabel>SDT:</FormLabel>
              <Input type='text' onChange={(e) => setSDT(e.target.value)} />
            </FormControl>
            <FormControl id='username' isRequired>
              <FormLabel>Tên tài khoản</FormLabel>
              <Input type='text' onChange={(e) => setUsername(e.target.value)} />
            </FormControl>
            <FormControl id='email' isRequired>
              <FormLabel>Email</FormLabel>
              <Input type='email' onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id='password' isRequired>
              <FormLabel>Mật khẩu</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} onChange={(e) => setPassword(e.target.value)} />
                <InputRightElement h={'full'}>
                  <Button variant={'ghost'} onClick={() => setShowPassword((showPassword) => !showPassword)}>
                    {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                onClick={handleRegistration}
                loadingText='Submitting'
                size='lg'
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                fontWeight={'light'}
              >
                Tạo tài khoản mới
              </Button>
              <Text textAlign='center' color='primary'>
                {error}
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
