import { Box, Button, Container, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import AuthAPI from '../../../API/authAPI';
import moment from 'moment';

export default function QuanLyDoanVien() {
  const [userList, setUserList] = useState([]);
  const [resetData, setResetData] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const res = await AuthAPI.getAllUsers();
      const result = res.filter((item) => !item.isAdmin);
      console.log(result);
      setUserList(result);
    };
    fetchData();
  }, [resetData]);

  const handleDeleteUser = async (id) => {
    const res = await AuthAPI.deleteUser(id);
    if (!res.status) {
      setResetData(!resetData);
      console.log(res);
    } else {
      console.log(res);
    }
  };

  return (
    <Container maxW='max-content' minH='80vh'>
      <Heading textAlign='center' fontWeight='semibold'>
        Quản lý đoàn viên
      </Heading>
      <Box boxShadow='base' borderRadius={5} mt={5}>
        <TableContainer>
          <Table variant='simple' bgColor='BGColor' borderRadius={10}>
            <Thead>
              <Tr>
                <Th w={3}>STT</Th>
                <Th>Họ và tên</Th>
                <Th>Ngày sinh</Th>
                <Th>Giới tính</Th>
                <Th>Địa chỉ</Th>
                <Th>Nơi sinh hoạt</Th>
                <Th>Hành động</Th>
              </Tr>
            </Thead>
            <Tbody>
              {userList?.map((user, index) => (
                <Tr key={index}>
                  <Td>{index + 1}</Td>
                  <Td>{user.fullName}</Td>
                  <Td>{moment(user.ngaySinh).format('DD-MM-YYYY')}</Td>
                  <Td>{user.gioiTinh}</Td>
                  <Td>{user.diaChi}</Td>
                  <Td>{user.noiSinhHoat}</Td>
                  <Td display='flex' alignItems='center'>
                    <Button colorScheme='blue' fontWeight='light' onClick={() => handleDeleteUser(user.id)}>
                      Xóa
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}
