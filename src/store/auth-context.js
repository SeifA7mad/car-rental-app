import { createContext, useState } from 'react';
import { useNavigate } from 'react-router';

export const AuthContext = createContext({
  isLoggedIn: false,
  userToken: null,
  login(token) {},
  logout() {},
});

let logoutTimer = null;

const calculateRamainingTime = (expireTime) => {
  const currentTime = new Date().getTime();
  const adjExpireTime = new Date(expireTime).getTime();

  const remainingTime = adjExpireTime - currentTime;

  return remainingTime;
};

const AuthContextProvider = ({ children }) => {
  const initialToken = JSON.parse(localStorage.getItem('userToken'));
  const [token, setToken] = useState(initialToken);
  const isLoggedIn = !!token;

  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem('userToken');
    setToken(null);
    navigate('/auth/login');
    // clearTimeout(logoutTimer);
  };

  const loginHandler = (token) => {
    localStorage.removeItem('userToken');
    const tokenJson = JSON.stringify(token);
    localStorage.setItem('userToken', tokenJson);
    setToken(token);
    navigate('/store');
    // const remainingTime = calculateRamainingTime(expireTime);
    // logoutTimer =  setTimeout(logoutHandler, 20000);
  };

  const authdata = {
    isLoggedIn,
    userToken: token,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={authdata}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
