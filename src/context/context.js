import React, {createContext, useMemo, useState} from 'react';
import {Api} from '../Api/Api';
export const AuthContext = createContext({logged: false});
const host = '192.168.100.10:3000';
const AuthProvider = ({children}) => {
  const [user, setUser] = useState({logged: false});
  const login = async (email, password) => {
    const res = await Api(host).post('/login_api', {
      email,
      password,
    });
    setUser({logged: true, ...res.data});
  };
  const getClients = async () => {
    const res = await Api(host).get(`/consulta_api?id=${user.user_id}`);
    return res.data;
  };
  const logOut = () => {
    setUser({logged: false});
  };
  const userValues = useMemo(
    () => ({
      user,
      login,
      logOut,
      getClients,
    }),
    [user],
  );
  return (
    <AuthContext.Provider value={userValues}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
