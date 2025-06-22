export const getUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

export const getUserRole = () => {
  const user = getUser();
  return user?.role ?? 'user';
};

export const isLoggedIn = () => {
  return !!localStorage.getItem('token');
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
