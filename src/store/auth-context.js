import React, { useCallback, useEffect, useRef, useState } from 'react';
import jwtDecode from 'jwt-decode';

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  userRole: null,
  isDrawerOpen: false,
  openDrawer: () => {},
  closeDrawer: () => {},
  login: (token, userRole, expTime) => {},
  logout: () => {},
  navTitle: '',
  changeTitle: (newTitle) => {},
  baseURL: '',
  setBaseURL: (url) => {},
});

let timeout;

const calcRemainingTime = (expTime) => {
  const currTime = new Date().getTime();
  const expiring = new Date(expTime).getTime();
  return expiring - currTime;
};

const checkInitToken = () => {
  const storedToken = localStorage.getItem('token');
  const expTime = localStorage.getItem('exp');
  const remaining = calcRemainingTime(expTime);
  if (remaining <= 3600) {
    localStorage.clear();
    return null;
  }
  return {
    token: storedToken,
    remaining,
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = checkInitToken();
  let initToken;
  if (tokenData) {
    initToken = tokenData.token;
  }
  const [token, setToken] = useState(initToken);
  const [open, setOpen] = useState(false);
  const [navTitle, setNavTitle] = useState('Dashboard');
  const [baseURL, setBaseURL] = useState(
    localStorage.getItem('baseURL')
      ? localStorage.getItem('baseURL')
      : 'http://localhost:8080'
  );

  const userLoggedIn = !!token;
  let userRole = useRef(null);

  if (token != null) {
    const decoded = jwtDecode(token);
    if ('isAdmin' in decoded) {
      userRole.current = 'ADMIN';
    } else if ('isMaster' in decoded) {
      userRole.current = 'MASTER';
    } else if ('isStudent' in decoded) {
      userRole.current = 'STUDENT';
    }
  }

  const openDrawerHandler = () => {
    setOpen(true);
  };
  const closeDrawerHandler = () => {
    setOpen(false);
  };

  const logoutHandler = useCallback(() => {
    setToken(null);
    setOpen(false);
    setNavTitle('Dashboard');
    localStorage.removeItem('token');
    localStorage.removeItem('exp');
    userRole.current = null;
    if (timeout) {
      clearTimeout(timeout);
    }
  }, []);

  const loginHandler = (token, userRole, expTime) => {
    setToken(token);
    localStorage.setItem('token', token);
    localStorage.setItem('exp', expTime);
    localStorage.setItem('baseURL', baseURL);
    const remaining = calcRemainingTime(expTime);
    timeout = setTimeout(logoutHandler, 1000000);
  };

  const setURL = (url) => {
    setBaseURL(url);
  };

  useEffect(() => {
    if (tokenData) {
      timeout = setTimeout(logoutHandler, tokenData.remaining);
    }
  }, [tokenData, logoutHandler]);

  const changeTitle = (newTitle) => {
    setNavTitle(newTitle);
  };

  const contextValue = {
    token: token,
    isLoggedIn: userLoggedIn,
    userRole: userRole.current,
    isDrawerOpen: open,
    openDrawer: openDrawerHandler,
    closeDrawer: closeDrawerHandler,
    login: loginHandler,
    logout: logoutHandler,
    navTitle: navTitle,
    changeTitle: changeTitle,
    baseURL: baseURL,
    setBaseURL: setURL,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
