import {
  Avatar,
  Box,
  Button,
  Center,
  Checkbox,
  Container,
  Flex,
  Heading,
  HStack,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Slide,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { CgLogIn } from 'react-icons/cg';
import { FaUserCircle } from 'react-icons/fa';
import { MdOutlineKeyboardArrowDown as IconDown } from 'react-icons/md';
import { Link } from 'react-router-dom';
import AuthAPI from '../../API/authAPI';
import logo from '../../assets/images/MainLogoRemovebg.png';
import AuthStorage from '../../feature/AuthStorage';
import ROUTER from '../../router';
import styles from './navbar.module.css';
import { useNavigate } from 'react-router-dom';

const Tags = [
  { key: 0, value: 'Trang chủ', router: ROUTER.HOME },
  { key: 1, value: 'Bài Đăng', router: ROUTER.BAI_DANG },
  {
    key: 2,
    value: 'Hoạt Động',
    element: [
      { tag: 'Tất cả', router: ROUTER.HOAT_DONG.ALL },
      { tag: 'Đang diễn ra', router: ROUTER.HOAT_DONG.DANG_DIEN_RA },
      { tag: 'Đã kết thúc', router: ROUTER.HOAT_DONG.DA_KET_THUC },
    ],
  },
  { key: 3, value: 'Hỗ Trợ' },
];

const userOptions = [
  { tag: 'Quản lý đoàn viên', router: ROUTER.ADMIN.QUAN_LY_USER, role: 'admin' },
  { tag: 'Cấp tài khoản đoàn viên', router: ROUTER.ADMIN.CAP_TAI_KHOAN, role: 'admin' },
  { tag: 'Thông tin cá nhân', router: ROUTER.USER.INFO, role: 'user' },
];

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [savePassword, setSavePassword] = useState(false);
  const [logError, setLogError] = useState('');
  const handleClick = () => setShow(!show);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [login, setLogin] = useState(false);
  const [userInfo, setUserInfo] = useState('');
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };
  const navigate = useNavigate();
  const logout = () => {
    AuthStorage.logout();
    setLogin(false);
    setUserInfo('');
    navigate(ROUTER.HOME);
  };

  const handleLogin = async () => {
    const res = await AuthAPI.Login({ username: username, password: password });
    if (res.jwt) {
      setLogError('');
      savePassword ? AuthStorage.setUserLocal(res) : AuthStorage.setUserSession(res);
      setLogin(true);
      setUserInfo(res.user);
      console.log(res.user);
      onClose();
    } else {
      setLogError('Tên đăng nhập hoặc mật khẩu không chính xác');
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  useEffect(() => {
    if (AuthStorage.getKey('token') !== null) {
      setLogin(true);
      setUserInfo(JSON.parse(AuthStorage.getKey('user')));
    }
  }, []);
  return (
    <Box>
      <Flex color='white' w='full' h='65px' bg='layout' alignItems='center' justifyContent='space-between' px={14}>
        <Heading size='md' fontWeight='light'>
          Trang quản lý hoạt động, Đoàn viên / Thanh niên khoa Sư phạm
        </Heading>
        {login ? (
          <Box position='relative' className={styles.showDropdownUserOptions}>
            <HStack>
              <Avatar name={userInfo.fullName} />
              <Text>Xin Chào: {userInfo.fullName}</Text>
            </HStack>
            <VStack className={styles.dropdownUserOptions} spacing={1}>
              {userInfo.isAdmin
                ? userOptions.map((tag, index) => (
                    <Link key={index} to={tag.router}>
                      <Text>{tag.tag}</Text>
                    </Link>
                  ))
                : userOptions
                    .filter((tag) => tag.role === 'user')
                    .map((tag, index) => (
                      <Link key={index} to={tag.router}>
                        <Text>{tag.tag}</Text>
                      </Link>
                    ))}
              <Box cursor='pointer' onClick={logout}>
                <Text>Đăng xuất</Text>
              </Box>
            </VStack>
          </Box>
        ) : (
          <Button colorScheme='blue' fontWeight='light' rightIcon={<CgLogIn fontSize={20} />} onClick={onOpen}>
            Đăng nhập
          </Button>
        )}
      </Flex>
      <HStack px={14} spacing={10} my={2}>
        <Image src={logo} alt='LOGO' boxSize='80px' />
        {Tags.map((tag) => (
          <Center key={tag.key}>
            <Link to={tag.router ? tag.router : '#'} position='relative' className={styles.showDropdown}>
              <Text fontSize='lg' fontWeight='semibold' display='flex' alignItems='center' sx={{ cursor: 'pointer' }}>
                {tag.value} {tag.element && <IconDown style={{ marginRight: 5 }} />}
              </Text>
              {tag.element && (
                <VStack className={styles.dropdown} spacing={1}>
                  {tag.element.map((ele) => (
                    <Link key={ele.tag} to={ele.router}>
                      <Text>{ele.tag}</Text>
                    </Link>
                  ))}
                </VStack>
              )}
            </Link>
          </Center>
        ))}
      </HStack>
      {scrollPosition >= 100 && (
        <Slide direction='top' in={true} style={{ zIndex: 10 }}>
          <Flex bgColor='layout' w='full' h={70}>
            <Container maxW='container.xl' display='flex' justifyContent='space-between' alignItems='center'>
              <Image boxSize='70px' src={logo} alt='logo' />
              <HStack h='100%' color='white' alignItems='center' spacing={14}>
                {Tags.map((tag) => (
                  <Link
                    to={tag.router ? tag.router : '#'}
                    key={tag.key}
                    position='relative'
                    className={styles.showDropdown}
                  >
                    <Text fontSize='lg' fontWeight='light' display='flex' alignItems='center'>
                      {tag.value} {tag.element && <IconDown style={{ marginRight: 5 }} />}
                    </Text>
                    {tag.element && (
                      <VStack className={styles.dropdown} spacing={1}>
                        {tag.element.map((ele) => (
                          <Link key={ele.tag} to={ele.router}>
                            <Text>{ele.tag}</Text>
                          </Link>
                        ))}
                      </VStack>
                    )}
                  </Link>
                ))}
              </HStack>
              {login ? (
                <Box position='relative' className={styles.showDropdownUserOptions}>
                  <HStack>
                    <Avatar name={userInfo.fullName} />
                    <Text color='white'>Xin Chào: {userInfo.fullName}</Text>
                  </HStack>
                  <VStack className={styles.dropdownUserOptions} spacing={1}>
                    {userInfo.isAdmin
                      ? userOptions.map((tag, index) => (
                          <Link key={index} to={tag.router}>
                            <Text>{tag.tag}</Text>
                          </Link>
                        ))
                      : userOptions
                          .filter((tag) => tag.role === 'user')
                          .map((tag, index) => (
                            <Link key={index} to={tag.router}>
                              <Text>{tag.tag}</Text>
                            </Link>
                          ))}
                    <Box cursor='pointer' onClick={logout}>
                      <Text>Đăng xuất</Text>
                    </Box>
                  </VStack>
                </Box>
              ) : (
                <Button colorScheme='blue' fontWeight='light' rightIcon={<CgLogIn fontSize={20} />} onClick={onOpen}>
                  Đăng nhập
                </Button>
              )}
            </Container>
          </Flex>
        </Slide>
      )}
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} isCentered motionPreset='slideInBottom'>
        <ModalOverlay bg='blackAlpha.600' backdropFilter='blur(10px) hue-rotate(20deg)' />
        <ModalContent bgColor='BGColor'>
          <ModalHeader textAlign='center' />
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={2}>
              <FaUserCircle fontSize={60} color='#00AFFF' />
              <Heading size='md'>Đăng nhập</Heading>
              <Input variant='filled' placeholder='Tên đăng nhập' onChange={(e) => setUsername(e.target.value)} />
              <InputGroup size='md'>
                <Input
                  pr='4.5rem'
                  type={show ? 'text' : 'password'}
                  placeholder='Mật khẩu'
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement width='4.5rem'>
                  <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? (
                      <AiFillEyeInvisible fontSize={20} color='#00AFFF' />
                    ) : (
                      <AiFillEye fontSize={20} color='#00AFFF' />
                    )}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <Text color='red' fontSize={12}>
                {logError}
              </Text>
              <Button w='full' fontWeight='light' colorScheme='blue' onClick={handleLogin}>
                Đăng nhập
              </Button>
              <Checkbox colorScheme='green' alignSelf='flex-start' onChange={(e) => setSavePassword(e.target.checked)}>
                Nhớ mật khẩu
              </Checkbox>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
