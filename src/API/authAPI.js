import axiosClient from './axiosClient';

const AuthAPI = {
  Login: ({ username, password }) => {
    const url = '/api/auth/local';
    return axiosClient.post(
      url,
      {
        identifier: username,
        password: password,
      },
      { params: { populate: '*' } },
    );
  },
  Register: (registerData) => {
    const url = '/api/auth/local/register';
    return axiosClient.post(url, registerData);
  },
  updateAccount: (id, userData) => {
    const url = `/api/users/${id}`;
    return axiosClient.put(url, userData);
  },
  getAllUsers: () => {
    const url = `/api/users`;
    return axiosClient.get(url);
  },
  deleteUser: (id) => {
    const url = `/api/users/${id}`;
    return axiosClient.delete(url);
  },
};

export default AuthAPI;

// const registerData = {
//   username: username,
//   email: email,
//   password: password,
// };
