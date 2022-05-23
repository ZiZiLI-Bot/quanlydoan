const AuthStorage = {
  setUserSession: (data) => {
    sessionStorage.setItem('token', data.jwt);
    sessionStorage.setItem('user', JSON.stringify(data.user));
  },
  setUserLocal: (data) => {
    localStorage.setItem('token', data.jwt);
    localStorage.setItem('user', JSON.stringify(data.user));
  },
  getKey: (key) => {
    if (!!localStorage.getItem(key) || !!sessionStorage.getItem(key)) {
      return localStorage.getItem(key) || sessionStorage.getItem(key);
    } else {
      return null;
    }
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  },
};

export default AuthStorage;
